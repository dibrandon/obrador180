// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats } from "@/lib/api.js";
import { subscribeStatsChanged } from "@/lib/events.js";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | offline | error
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchStats = () => {
      setStatus("loading");
      getAdminStats()
        .then((data) => {
          if (!isMounted) return;
          setStats(data);
          setStatus("ready");
        })
        .catch((err) => {
          console.error("Dashboard stats error:", err);
          if (!isMounted) return;
          if (err?.code === "NETWORK") setStatus("offline");
          else setStatus("error");
        });
    };

    fetchStats();
    const unsubscribe = subscribeStatsChanged(fetchStats);

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="admin-shell admin-shell--center">
        <p className="admin-status-text">Cargando dashboard...</p>
      </div>
    );
  }

  if (status === "offline") {
    return (
      <div className="admin-shell admin-shell--center">
        <div className="admin-card">
          <h1 className="admin-form__title">Bienvenido, Obrador 180 graus</h1>
          <p className="admin-status-text">
            Servidor no disponible. Intenta de nuevo en unos segundos.
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="admin-shell admin-shell--center">
        <div className="admin-card">
          <h1 className="admin-form__title">Bienvenido, Obrador 180 graus</h1>
          <p className="admin-status-text">
            Ocurrió un error al cargar las estadísticas.
          </p>
        </div>
      </div>
    );
  }

  const { active = 0, inactive = 0, total = 0, lastUpdate = null } = stats ?? {};

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <h1 className="admin-header__title">Bienvenido, Obrador 180 graus</h1>
        <div className="admin-header__actions">
          <button
            type="button"
            className="admin-header__btn admin-header__btn--ghost"
            onClick={() => navigate("/admin")}
          >
            Administrar productos
          </button>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-card" aria-label="Resumen de productos">
          <h2 className="admin-card__title">Dashboard</h2>
          <p>
            Productos activos: <strong>{active}</strong>
          </p>
          <p>
            Archivados: <strong>{inactive}</strong>
          </p>
          <p>
            Total: <strong>{total}</strong>
          </p>
          <p>
            Última modificación:{" "}
            {lastUpdate ? new Date(lastUpdate).toLocaleString() : "---"}
          </p>
        </section>
      </main>
    </div>
  );
}