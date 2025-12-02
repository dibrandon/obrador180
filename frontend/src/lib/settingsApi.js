import { apiFetch } from "./api.js";

const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");

export async function fetchSettings() {
  const res = await fetch(`${API_BASE}/settings`);
  if (!res.ok) {
    throw new Error("Error fetching settings");
  }
  return res.json();
}

export async function fetchAdminSettings() {
  const res = await apiFetch("/admin/settings", {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    const msg = res.status === 401 ? "Unauthorized" : "Error fetching admin settings";
    throw new Error(msg);
  }
  return res.json();
}

export async function updateAdminSettings(payload) {
  const res = await apiFetch("/admin/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const msg = res.status === 401 ? "Unauthorized" : "Error updating admin settings";
    throw new Error(msg);
  }
  return res.json();
}
