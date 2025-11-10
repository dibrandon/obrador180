const RAW_BASE = import.meta.env.VITE_API_BASE || "";
const API_BASE = RAW_BASE.replace(/\/+$/, "");
const LS_KEY = "adminKey";
const hasWindow = typeof window !== "undefined";

function safeGetStorage(getter) {
  if (!hasWindow) return null;
  try {
    return getter();
  } catch {
    return null;
  }
}

const sessionStore = safeGetStorage(() => window.sessionStorage);
const localStore = safeGetStorage(() => window.localStorage);

function readKey(store) {
  if (!store) return "";
  try {
    return store.getItem(LS_KEY) || "";
  } catch {
    return "";
  }
}

function writeKey(store, value) {
  if (!store) return;
  try {
    store.setItem(LS_KEY, value);
  } catch {
    /* ignore */
  }
}

function removeKey(store) {
  if (!store) return;
  try {
    store.removeItem(LS_KEY);
  } catch {
    /* ignore */
  }
}

function resolveURL(path = "") {
  if (!path) return API_BASE;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/")) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
}

function consumeKeyFromURLDev() {
  if (!hasWindow || !import.meta.env.DEV) return;
  try {
    const url = new URL(window.location.href);
    const key = (url.searchParams.get("k") || "").trim();
    if (!key) return;
    removeKey(localStore);
    removeKey(sessionStore);
    writeKey(sessionStore, key);
    url.searchParams.delete("k");
    window.history.replaceState({}, "", url.toString());
  } catch {
    /* noop */
  }
}

consumeKeyFromURLDev();

export function getAdminKey() {
  const fromSession = readKey(sessionStore);
  if (fromSession) return fromSession.trim();
  const fromLocal = readKey(localStore);
  return (fromLocal || "").trim();
}

export function setAdminKey(value, { remember = false } = {}) {
  const v = (value || "").trim();
  removeKey(sessionStore);
  removeKey(localStore);
  if (!v) return;
  if (remember) writeKey(localStore, v);
  else writeKey(sessionStore, v);
}

export function clearAdminKey() {
  removeKey(sessionStore);
  removeKey(localStore);
}

export function isAuthedLocally() {
  return Boolean(getAdminKey());
}

function base64Encode(value) {
  if (typeof btoa === "function") {
    return btoa(
      encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf8").toString("base64");
  }
  return "";
}

function adminHeaders(extra = {}) {
  const headers = new Headers(extra);
  const key = getAdminKey();
  if (key) {
    const token = base64Encode(`${key}:x`);
    headers.set("Authorization", `Basic ${token}`);
  }
  return headers;
}

export function apiFetch(path, init = {}) {
  const headers = adminHeaders(init.headers || {});
  const url = resolveURL(path);
  return fetch(url, { ...init, headers });
}

async function handleResponse(res, ctx = "") {
  const text = await res.text().catch(() => "");
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    if (res.status === 401) {
      clearAdminKey();
    }
    const msg =
      (data && (data.error || data.message)) ||
      text ||
      `${ctx || "HTTP"} ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export async function verifyAdminKey() {
  const key = getAdminKey();
  if (!key) return false;

  try {
    // Usamos un endpoint ADMIN que ya existe y está protegido por adminAuth
    // así evitamos depender de /admin/ping por ahora.
    const res = await apiFetch("/products/inactive", { method: "GET" });

    if (res.status === 401) {
      // Clave incorrecta → limpiamos sesión para que el guard te lleve a /admin/login
      clearAdminKey();
      return false;
    }

    // 200 => clave válida
    return res.ok;
  } catch {
    // Error de red u otro → tratamos como no válido
    return false;
  }
}

export async function getProducts() {
  const res = await fetch(resolveURL("/products"));
  return handleResponse(res, "GET /products");
}

async function sendJSON(path, method, body) {
  const res = await apiFetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(res, `${method} ${path}`);
}

export function postJSON(path, body) {
  return sendJSON(path, "POST", body);
}

export function putJSON(path, body) {
  return sendJSON(path, "PUT", body);
}

export async function del(path) {
  const res = await apiFetch(path, { method: "DELETE" });
  return handleResponse(res, `DELETE ${path}`);
}

export async function getInactiveProducts() {
  const res = await apiFetch("/products/inactive", { method: "GET" });
  return handleResponse(res, "GET /products/inactive");
}

export async function restoreProduct(id) {
  const res = await apiFetch(`/products/${id}/restore`, { method: "PUT" });
  return handleResponse(res, "PUT /products/:id/restore");
}
