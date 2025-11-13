import { useEffect, useState } from "react";
import { isAuthedLocally, verifyAdminKey } from "@/lib/api";

function redirectToLogin() {
  if (typeof window === "undefined") return;
  const next = encodeURIComponent(
    window.location.pathname + window.location.search
  );
  window.location.replace(`/admin/login?next=${next}`);
}

export default function AdminGuard({ children }) {
  const [status, setStatus] = useState("checking");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isAuthedLocally()) {
        if (!cancelled) setStatus("denied");
        redirectToLogin();
        return;
      }
      const result = await verifyAdminKey();
      if (!result.ok) {
        if (result.reason === "network") {
          if (!cancelled) {
            setStatus("offline");
            setMessage("Servidor no disponible. Reintenta en unos minutos.");
          }
          return;
        }
        if (!cancelled) {
          setStatus("denied");
          setMessage("Sesión inválida. Inicia sesión nuevamente.");
        }
        redirectToLogin();
        return;
      }
      if (!cancelled) setStatus("allowed");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "offline") {
    return (
      <main className="container" style={{ padding: 24 }}>
        <p style={{ textAlign: "center" }}>{message}</p>
      </main>
    );
  }

  if (status !== "allowed") return null;
  return children;
}
