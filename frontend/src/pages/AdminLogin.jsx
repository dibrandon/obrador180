import { useEffect, useState } from "react";
import {
  isAuthedLocally,
  setAdminKey,
  verifyAdminKey,
  clearAdminKey,
} from "@/lib/api";

function resolveNextDestination(defaultPath = "/admin") {
  if (typeof window === "undefined") return defaultPath;
  try {
    const url = new URL(window.location.href);
    const rawNext = url.searchParams.get("next");
    if (!rawNext) return defaultPath;
    const decoded = decodeURIComponent(rawNext);
    return decoded.startsWith("/") ? decoded : defaultPath;
  } catch {
    return defaultPath;
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
        const result = await verifyAdminKey();
        if (result.ok) {
          window.location.replace(resolveNextDestination("/admin/dashboard"));
          return;
        }
        if (!cancelled && result.reason === "network") {
          setErr("Servidor no disponible. Intenta nuevamente en unos minutos.");
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
    const result = await verifyAdminKey();
    if (!result.ok) {
      if (result.reason === "unauthorized") {
        clearAdminKey();
        setErr("Clave inválida o sin permisos.");
      } else if (result.reason === "network") {
        setErr("Servidor no disponible. Intenta nuevamente en unos minutos.");
      } else {
        setErr("No se pudo verificar la clave. Reintenta.");
      }
      setSubmitting(false);
      return;
    }
    window.location.replace(resolveNextDestination("/admin/dashboard"));
  };

  if (checking) {
    return (
      <div className="admin-shell admin-shell--center">
        <p className="admin-status-text">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <div className="admin-shell admin-shell--center">
      <div className="admin-card">
        <h1 className="admin-form__title">Acceso administrador</h1>

        <form onSubmit={onSubmit} className="admin-card__form">
          <label className="admin-form__label">
            Clave admin
            <input
              type="password"
              autoFocus
              className="admin-form__input"
              placeholder="Clave admin"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </label>

          <label className="admin-form__remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Recordarme en este dispositivo</span>
          </label>

          {err && (
            <p className="admin-form__msg admin-form__msg--error">{err}</p>
          )}

          <button
            type="submit"
            className="admin-form__button"
            disabled={submitting}
          >
            {submitting ? "Verificando..." : "Entrar"}
          </button>
        </form>

        {import.meta.env.DEV && (
          <p className="admin-hint">
            Tip dev: podés usar <code>?k=tuClave</code> en la URL solo en
            desarrollo.
          </p>
        )}
      </div>
    </div>
  );
}
