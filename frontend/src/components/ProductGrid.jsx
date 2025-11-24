import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "./ProductCard";
import ViewToggle from "./ViewToggle";

const DENSITY_KEY = "obrador_density";
const DENSITY_OPTIONS = ["compact", "cozy", "roomy"];

export default function ProductGrid() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [density, setDensity] = useState("cozy");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(DENSITY_KEY);
    if (saved && DENSITY_OPTIONS.includes(saved)) {
      setDensity(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(DENSITY_KEY, density);
  }, [density]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setItems(data);
        setStatus("ok");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    })();
  }, []);

  const handleDensityChange = (nextDensity) => {
    if (!DENSITY_OPTIONS.includes(nextDensity) || nextDensity === density) return;
    setDensity(nextDensity);
  };

  let content = null;

  if (status === "loading") {
    content = <p className="muted">Cargando productos...</p>;
  } else if (status === "error") {
    content = <p className="muted">No se pudieron cargar los productos.</p>;
  } else if (items.length === 0) {
    content = <p className="muted">Pronto subiremos productos.</p>;
  } else {
    content = (
      <section className="grid product-grid" data-density={density}>
        {items.map((p) => (
          <ProductCard key={p._id || p.id || p.name} product={p} />
        ))}
      </section>
    );
  }

  return (
    <div className="product-grid__wrapper">
      <div className="product-grid__toolbar">
        <ViewToggle value={density} onChange={handleDensityChange} />
      </div>
      {content}
    </div>
  );
}
