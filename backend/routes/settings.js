import express from "express";
import { getOrCreateSettingsDoc } from "../services/settingsService.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const settings = await getOrCreateSettingsDoc();
    res.json({
      openingHours: settings.openingHours,
      vacationFrom: settings.vacationFrom,
      vacationTo: settings.vacationTo,
      vacationMessage: settings.vacationMessage,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
