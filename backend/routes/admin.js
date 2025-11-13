import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { noStore } from "../middleware/noStore.js";

const router = Router();

router.get("/ping", adminAuth, noStore, (_req, res) => {
  res.json({ ok: true, at: new Date().toISOString() });
});

export default router;

