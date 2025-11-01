export function errorHandler(err, req, res, _next) {
  if (err?.message === "CORS bloqueado") {
    return res.status(403).json({ error: "Origen no permitido por CORS" });
  }
  console.error("Error:", err?.message || err);
  res.status(500).json({ error: "Error interno del servidor." });
}