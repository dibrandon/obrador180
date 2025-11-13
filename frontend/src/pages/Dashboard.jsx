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
        .then(data => {
          if (!isMounted) return;
          setStats(data);
          setStatus("ready");
        })
        .catch(err => {
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
      <div style={{ padding: "1rem" }}>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  if (status === "offline") {
    return (
      <div style={{ padding: "1rem" }}>
        <h1>Bienvenido, Obrador 180 graus</h1>
        <p>Servidor no disponible. Intenta de nuevo en unos segundos.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ padding: "1rem" }}>
        <h1>Bienvenido, Obrador 180 graus</h1>
        <p>Ocurrio un error al cargar las estadisticas.</p>
      </div>
    );
  }

  const { active = 0, inactive = 0, total = 0, lastUpdate = null } = stats ?? {};

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Bienvenido, Obrador 180 graus</h1>

      <section
        style={{
          marginTop: "1rem",
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>Dashboard</h2>
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
          Ultima modificacion:{" "}
          {lastUpdate ? new Date(lastUpdate).toLocaleString() : "---"}
        </p>
      </section>

      <button
        type="button"
        style={{ marginTop: "1.5rem" }}
        onClick={() => navigate("/admin")}
      >
        Administrar productos
      </button>
    </div>
  );
}
