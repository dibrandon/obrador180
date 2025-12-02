import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;
const CLEAN = process.argv.includes("--clean") || process.argv.includes("clean");

const SEED_TAG = "TEMP-SEED-180G";

async function connect() {
  if (!MONGO_URI) {
    console.error("Falta MONGO_URI en .env");
    process.exit(1);
  }
  await mongoose.connect(MONGO_URI, { /* opciones */ });
  console.log("Conectado a MongoDB");
}

async function seed() {
  const items = Array.from({ length: 24 }).map((_, i) => {
    const idx = i + 1;
    const families = ["Empanada", "Budin", "Chipa", "Tarta", "Galleta", "Sandwich"];
    const fam = families[i % families.length];
    const precioBase = 1.5 + (i % 6) * 0.75;
    return {
      name: `${fam} demo #${idx}`,
      description: `Producto demo ${fam.toLowerCase()} para pruebas de layout (item ${idx}).`,
      price: Number(precioBase.toFixed(2)),
      image: `https://picsum.photos/seed/obrador-${idx}/640/400`,
      gallery: [],
      isActive: true,
      _seedTag: SEED_TAG
    };
  });

  const ops = items.map(p => ({
    updateOne: {
      filter: { name: p.name },
      update: { $set: p },
      upsert: true
    }
  }));

  const result = await Product.bulkWrite(ops, { ordered: false });
  console.log("Seed ejecutado:", {
    upserted: result.upsertedCount ?? "n/a",
    modified: result.modifiedCount ?? "n/a",
    matched: result.matchedCount ?? "n/a",
  });

  const count = await Product.countDocuments({ _seedTag: SEED_TAG });
  console.log(`Total de productos sembrados (tag=${SEED_TAG}): ${count}`);
}

async function cleanSeed() {
  const res = await Product.deleteMany({ _seedTag: SEED_TAG });
  console.log(`Limpieza ejecutada. Documentos eliminados: ${res.deletedCount}`);
}

async function main() {
  await connect();

  if (CLEAN) {
    console.log("Ejecutando modo CLEAN - borro los productos sembrados previamente");
    await cleanSeed();
    await mongoose.disconnect();
    console.log("Desconectado");
    return;
  }

  await seed();
  await mongoose.disconnect();
  console.log("Desconectado");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
