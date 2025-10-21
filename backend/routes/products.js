import express from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

// GET: todos los productos
router.get("/", async (_req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// POST: crear producto (dummy)
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
