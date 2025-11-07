// backend/src/middleware/adminAuth.js
export function adminAuth(req, res, next) {
  const ADMIN_KEY = process.env.ADMIN_KEY;

  if (!ADMIN_KEY) {
    console.error("ADMIN_KEY no configurado en backend");
    return res
      .status(500)
      .json({ error: "ADMIN_KEY no configurado en backend" });
  }

  // 1) Header Authorization: Basic base64(key:x)
  const auth = req.headers.authorization || "";
  const m = auth.match(/^Basic\s+(.+)$/i);

  if (m) {
    try {
      const decoded = Buffer.from(m[1], "base64").toString("utf8");
      // Formato esperado "key:x"
      const key = decoded.split(":")[0] || "";
      if (key === ADMIN_KEY) return next();
    } catch (_) {
      /* cae a 401 */
    }
  }

  // 2) (fallback opcional) Query ?k=...
  if (req.query && req.query.k === ADMIN_KEY) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
}

