import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

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

  if (status === "loading") return <p>Cargando productos...</p>;
  if (status === "error") return <p>No se pudieron cargar los productos.</p>;
  if (items.length === 0) return <p>Pronto subiremos productos.</p>;

  return (
    <section className="grid">
      {items.map((p) => (
        <ProductCard key={p._id || p.id || p.name} product={p} />
      ))}
    </section>
  );
}
