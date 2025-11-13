import { Router } from "express";
import Product from "../models/Product.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { noStore } from "../middleware/noStore.js";

const router = Router();

/**
 * GET /products
 * Público — devuelve solo productos activos.
 */
router.get("/", async (req, res, next) => {
  try {
    const items = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /products
 * Requiere adminAuth.
 */
router.post("/", adminAuth, noStore, async (req, res, next) => {
  try {
    const { name, price, description = "", image = "", isActive = true } = req.body;

    const hasName = typeof name === "string" && name.trim().length > 0;
    const isNumber = typeof price === "number" && Number.isFinite(price) && price >= 0;

    if (!hasName || !isNumber) {
      return res.status(400).json({
        error: "Campos inválidos: 'name' (string) y 'price' (number >= 0) son obligatorios.",
      });
    }

    const doc = await Product.create({
      name: name.trim(),
      price,
      description: description.trim(),
      image: image.trim(),
      isActive,
    });

    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /products/:id
 * Requiere adminAuth.
 * Edita nombre, descripción, precio o imagen.
 */
router.put("/:id", adminAuth, noStore, async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;
    const update = {};

    if (typeof name === "string") update.name = name.trim();
    if (typeof description === "string") update.description = description.trim();
    if (typeof image === "string") update.image = image.trim();
    if (typeof price === "number" && Number.isFinite(price)) update.price = price;

    const doc = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doc) return res.status(404).json({ error: "Producto no encontrado." });

    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// DELETE /products/:id (baja lógica)
router.delete("/:id", adminAuth, noStore, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ ok: true, id });
  } catch (err) {
    next(err);
  }
});

// Solo admin:
router.get("/inactive", adminAuth, noStore, async (req, res, next) => {
  try {
    const items = await Product.find({ isActive: false }).sort({ updatedAt: -1 });
    res.json(items);
  } catch (err) { next(err); }
});

router.put("/:id/restore", adminAuth, noStore, async (req, res, next) => {
  try {
    const doc = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: "Producto no encontrado." });
    res.json({ ok: true, id: doc._id });
  } catch (err) { next(err); }
});


export default router;
