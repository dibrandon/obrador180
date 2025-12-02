import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { noStore } from "../middleware/noStore.js";
import Product from "../models/Product.js";
import { getOrCreateSettingsDoc } from "../services/settingsService.js";

const router = Router();

router.get("/ping", adminAuth, noStore, (_req, res) => {
  res.json({ ok: true, at: new Date().toISOString() });
});

router.get("/stats", adminAuth, noStore, async (_req, res) => {
  try {
    const [total, active, inactive, last] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: false }),
      Product.findOne().sort({ updatedAt: -1 }).lean(),
    ]);

    res.json({
      total,
      active,
      inactive,
      lastUpdate: last ? last.updatedAt : null,
    });
  } catch (err) {
    console.error("Error in /admin/stats:", err);
    res.status(500).json({ error: "internal_error" });
  }
});

router.get("/settings", adminAuth, noStore, async (_req, res, next) => {
  try {
    const settings = await getOrCreateSettingsDoc();
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

router.put("/settings", adminAuth, noStore, async (req, res, next) => {
  try {
    const { openingHours, vacationFrom, vacationTo, vacationMessage } = req.body || {};
    const settings = await getOrCreateSettingsDoc();

    if (Array.isArray(openingHours)) {
      settings.openingHours = openingHours;
    }

    settings.vacationFrom = vacationFrom || null;
    settings.vacationTo = vacationTo || null;
    settings.vacationMessage = vacationMessage ?? "";

    await settings.save();
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

export default router;
