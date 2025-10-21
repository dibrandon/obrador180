import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/products", productsRouter);

app.get("/health", (req, res) => res.json({ ok: true, service: "obrador180-api" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
