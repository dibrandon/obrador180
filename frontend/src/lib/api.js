const RAW_BASE = import.meta.env.VITE_API_BASE || "";
// Evita dobles barras cuando se hace BASE + path
const BASE = RAW_BASE.replace(/\/+$/, "");
const KEY  = import.meta.env.VITE_ADMIN_KEY || "";

/** Header Authorization: Basic <key:x> (si hay KEY en .env) */
function authHeader() {
  if (!KEY) return {};
  const token = btoa(`${KEY}:x`); // formato user:pass (dummy)
  return { Authorization: `Basic ${token}` };
}

/** Manejo de respuesta: intenta JSON; si falla, devuelve texto en el error */
async function handle(res, ctx = "") {
  const text = await res.text().catch(() => "");
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (_) {}
  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      text ||
      `${ctx || "HTTP"} ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

/** ----------------------- PÚBLICO ----------------------- */

/** Devuelve productos públicos (solo activos). */
export async function getProducts() {
  const res = await fetch(`${BASE}/products`);
  return handle(res, "GET /products");
}

/** ----------------------- ADMIN ------------------------ */

/** POST - usado por AdminForm */
export async function postJSON(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body),
  });
  return handle(res, `POST ${path}`);
}

/** PUT  */
export async function putJSON(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body),
  });
  return handle(res, `PUT ${path}`);
}

/** DELETE */
export async function del(path) {
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  return handle(res, `DELETE ${path}`);
}

/** -------------------- ADMIN EXTENDIDO -------------------- */

/**
 * GET /products/inactive
 * Devuelve la lista de productos con baja lógica (isActive: false).
 * Requiere autenticación mediante VITE_ADMIN_KEY.
 */
export async function getInactiveProducts() {
  const res = await fetch(`${BASE}/products/inactive`, {
    headers: { ...authHeader() },
  });
  return handle(res, "GET /products/inactive");
}

/**
 * PUT /products/:id/restore
 * Restaura un producto previamente dado de baja (isActive → true).
 * Requiere autenticación mediante VITE_ADMIN_KEY.
 */
export async function restoreProduct(id) {
  const res = await fetch(`${BASE}/products/${id}/restore`, {
    method: "PUT",
    headers: { ...authHeader() },
  });
  return handle(res, "PUT /products/:id/restore");
}
