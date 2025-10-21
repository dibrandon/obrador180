import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/Product.js";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  await Product.deleteMany({}); // limpio por si re-seed
  await Product.insertMany([
    {
      name: "Cheesecake de frutos rojos",
      description: "Base de galleta + crema suave, mermelada casera",
      price: 24,
      image: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    },
    {
      name: "Tarta de limón y merengue",
      description: "Crema de limón fresca, merengue italiano",
      price: 22,
      image: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    },
    {
      name: "Selva Negra",
      description: "Bizcocho de cacao, nata y cerezas al kirsch",
      price: 26,
      image: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    }
  ]);

  console.log("🍰 Seed OK: 3 productos creados");
  await mongoose.disconnect();
}

run().catch(err => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
