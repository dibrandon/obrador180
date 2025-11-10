import { useEffect, useState } from "react";
import { isAuthedLocally, setAdminKey, verifyAdminKey } from "@/lib/api";

function resolveNextDestination() {
  if (typeof window === "undefined") return "/admin";
  try {
    const url = new URL(window.location.href);
    const rawNext = url.searchParams.get("next");
    if (!rawNext) return "/admin";
    const decoded = decodeURIComponent(rawNext);
    return decoded.startsWith("/") ? decoded : "/admin";
  } catch {
    return "/admin";
  }
}

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [remember, setRemember] = useState(false);
  const [err, setErr] = useState("");
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isAuthedLocally()) {
        const ok = await verifyAdminKey();
        if (ok) {
          window.location.replace(resolveNextDestination());
          return;
        }
      }
      if (!cancelled) setChecking(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErr("");
    const trimmed = key.trim();
    if (!trimmed) {
      setErr("Ingresá la clave.");
      return;
    }
    setSubmitting(true);
    setAdminKey(trimmed, { remember });
    const ok = await verifyAdminKey();
    if (!ok) {
      setAdminKey("", { remember: false });
      setErr("Clave inválida o sin permisos.");
      setSubmitting(false);
      return;
    }
    window.location.replace(resolveNextDestination());
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-sm text-gray-500">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border p-6 space-y-4 bg-white">
        <h1 className="text-xl font-semibold">Acceso administrador</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="password"
            autoFocus
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Clave admin"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Recordarme en este dispositivo
          </label>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 border bg-black text-white hover:opacity-90 disabled:opacity-70"
            disabled={submitting}
          >
            {submitting ? "Verificando..." : "Entrar"}
          </button>
        </form>
        {import.meta.env.DEV && (
          <p className="text-xs text-gray-500">
            Tip dev: podés usar <code>?k=tuClave</code> en la URL solo en desarrollo.
          </p>
        )}
      </div>
    </div>
  );
}
