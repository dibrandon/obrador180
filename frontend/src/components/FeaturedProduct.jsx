import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "./ProductCard";

export default function FeaturedProduct() {
  const [featured, setFeatured] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const products = await getProducts();
        if (!Array.isArray(products) || products.length === 0) {
          setStatus("empty");
          return;
        }
        const newest = products[0];
        setFeatured(newest);
        setStatus("ready");
      } catch (e) {
        setStatus("error");
      }
    })();
  }, []);

  if (!featured || status !== "ready") return null;

  return (
    <section className="o-section o-section--featured" aria-label="Producto destacado">
      <header className="o-section__header">
        <h2 className="o-section__title">Producto destacado</h2>
        <p className="o-section__meta">Elegido directamente de la carta del obrador.</p>
      </header>

      <div className="featured-product__wrapper">
        <ProductCard product={featured} />
      </div>
    </section>
  );
}
