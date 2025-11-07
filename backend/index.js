import express from "express";
import "dotenv/config";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";

import productsRouter from "./routes/products.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
// Render/Vercel
app.set("trust proxy", 1);

/* -------------------------
   Middlewares base
------------------------- */
app.use(express.json());

// CORS con whitelist desde .env
const WHITELIST = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || WHITELIST.includes(origin)) return cb(null, true);
      return cb(new Error("CORS bloqueado"), false);
    },
  })
);

// Logger global
app.use(logger);

/* -------------------------
   Rutas sin limitador
------------------------- */
app.get("/health", (_req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    ok: dbState === 1,
    db: (() => {
      switch (dbState) {
        case 0: return "disconnected";
        case 1: return "connected";
        case 2: return "connecting";
        case 3: return "disconnecting";
        default: return "unknown";
      }
    })(),
    service: "obrador180-api",
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString()
  });
});

/* -------------------------
   Rutas con limitador
------------------------- */
const productsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(
  ["/products", "/api/products"],
  productsLimiter,
  productsRouter
);

/* -------------------------
   Manejador de errores
------------------------- */
app.use(errorHandler);

/* -------------------------
   Conexión y arranque
------------------------- */
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`API en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error de conexión MongoDB:", err.message);
    process.exit(1);
  });
