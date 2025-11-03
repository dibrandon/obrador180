const BASE = import.meta.env.VITE_API_BASE || "";
const KEY = import.meta.env.VITE_ADMIN_KEY || "";

/**
 * Devuelve todos los productos públicos.
 */
export async function getProducts(){
  const res = await fetch(`${BASE}/products`);
  if(!res.ok) throw new Error(`API /products ${res.status}`);
  return res.json();
}

/**
 * Encabezado básico para las llamadas del panel admin.
 */
function authHeader() {
  if (!KEY) return {};
  const token = btoa(`${KEY}:x`); // formato user:pass (dummy)
  return { Authorization: `Basic ${token}` };
}

/**
 * POST genérico (usado en AdminForm)
 */
export async function postJSON(path, data) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(err || `POST ${path} ${res.status}`);
  }
  return res.json();
}

/**
 * (Para etapas futuras del back-office)
 */
export async function putJSON(path, data) {
  const res = await fetch(`${BASE}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PUT ${path} ${res.status}`);
  return res.json();
}

export async function del(path) {
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error(`DELETE ${path} ${res.status}`);
  return res.json();
}