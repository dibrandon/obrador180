// backend/routes/products.js
import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

// GET /products
router.get("/", async (req, res, next) => {
  try {
    const items = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// POST /products
router.post("/", async (req, res, next) => {
  try {
    const { name, price, description = "", imageUrl = "", isActive = true } = req.body;

    const hasName = typeof name === "string" && name.trim().length > 0;
    const isNumber = typeof price === "number" && Number.isFinite(price) && price >= 0;

    if (!hasName || !isNumber) {
      return res.status(400).json({ error: "Campos inválidos: 'name' (string) y 'price' (number >= 0) son obligatorios." });
    }

    const doc = await Product.create({
      name: name.trim(),
      price,
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      isActive
    });

    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});

export default router;
