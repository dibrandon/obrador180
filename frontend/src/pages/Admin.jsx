import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminStatusBar from "@/components/admin/AdminStatusBar.jsx";
import AdminNav from "@/components/admin/AdminNav.jsx";
import AdminList from "@/components/admin/AdminList.jsx";
import AdminForm from "@/components/AdminForm.jsx";
import AdminSettings from "@/components/admin/AdminSettings.jsx";
import { clearAdminKey, getInactiveProducts, getProducts } from "@/lib/api";
import { subscribeStatsChanged } from "@/lib/events.js";

function calcularStats(products) {
  const total = products.length;

  let activos = 0;
  let pausados = 0;

  for (const p of products) {
    const status = p.status || "active";

    if (status === "active") {
      activos++;
    } else if (status === "paused" || status === "hidden") {
      pausados++;
    }
  }

  return { total, activos, pausados };
}

export default function AdminPage() {
  const [view, setView] = useState("activos");
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setStatus("loading");
        const [activos, pausados] = await Promise.all([
          getProducts(),
          getInactiveProducts().catch(() => []),
        ]);

        if (cancelled) return;

        const normalizedActive = (activos || []).map((p) => ({
          ...p,
          status: p.status || "active",
        }));
        const normalizedPaused = (pausados || []).map((p) => ({
          ...p,
          status: p.status || "paused",
        }));

        setProducts([...normalizedActive, ...normalizedPaused]);
        setStatus("idle");
      } catch (error) {
        console.error(error);
        if (!cancelled) setStatus("error");
      }
    }

    loadProducts();
    const unsubscribe = subscribeStatsChanged(loadProducts);

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const stats = useMemo(() => calcularStats(products), [products]);

  const handleLogout = () => {
    clearAdminKey();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1 className="admin-header__title">Panel de productos</h1>
        <div className="admin-header__actions">
          <button
            type="button"
            className="admin-header__btn admin-header__btn--ghost"
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </header>

      <AdminStatusBar stats={stats} />

      <AdminNav view={view} onChange={setView} />

      <main className="admin-content">
        {view !== "ajustes" && status === "loading" && <p>Cargando productos...</p>}
        {view !== "ajustes" && status === "error" && (
          <p>No se pudieron cargar los productos del panel.</p>
        )}

        {view === "ajustes" && <AdminSettings />}

        {status === "idle" && view === "nuevo" && (
          <section aria-label="Alta y edición de productos">
            <h2 style={{ marginBottom: "0.5rem" }}>Nuevo producto</h2>
            <AdminForm />
          </section>
        )}

        {status === "idle" && view !== "nuevo" && view !== "ajustes" && <AdminList />}
      </main>
    </div>
  );
}
