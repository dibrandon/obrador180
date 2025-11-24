import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminStatusBar from "@/components/admin/AdminStatusBar.jsx";
import AdminNav from "@/components/admin/AdminNav.jsx";
import AdminForm from "@/components/AdminForm.jsx";
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

function filtrarPorVista(products, view) {
  if (view === "todos") return products;

  if (view === "activos") {
    return products.filter((p) => (p.status || "active") === "active");
  }

  if (view === "pausados") {
    return products.filter(
      (p) => p.status === "paused" || p.status === "hidden"
    );
  }

  return products;
}

function formatStatusLabel(status) {
  if (status === "paused" || status === "hidden") return "Pausado";
  return "Activo";
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
  const filtered = useMemo(
    () => filtrarPorVista(products, view),
    [products, view]
  );

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
        {status === "loading" && <p>Cargando productos...</p>}
        {status === "error" && (
          <p>No se pudieron cargar los productos del panel.</p>
        )}

        {status === "idle" && view === "nuevo" && (
          <section aria-label="Alta y edición de productos">
            <h2 style={{ marginBottom: "0.5rem" }}>Nuevo producto</h2>
            <AdminForm />
          </section>
        )}

        {status === "idle" && view !== "nuevo" && (
          <section
            aria-label="Listado y gestión de productos"
            className="admin-main__list"
          >
            {filtered.length === 0 ? (
              <p>No hay productos en esta vista.</p>
            ) : (
              <ul className="admin-product-list">
                {filtered.map((p) => (
                  <li
                    key={p._id || p.id || p.name}
                    className="admin-product-list__item"
                  >
                    <div className="admin-product-list__main">
                      <strong>{p.name || "(Sin nombre)"}</strong>
                      <span className="admin-product-list__status">
                        {formatStatusLabel(p.status || "active")}
                        {!p.image ? " · Sin foto" : ""}
                      </span>
                    </div>
                    {p.price != null && (
                      <span className="admin-product-list__price">
                        {p.price} €
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
