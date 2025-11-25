import HeaderNav from "@/components/HeaderNav.jsx";
import ProductGrid from "@/components/ProductGrid.jsx";
import Footer from "@/components/Footer.jsx";

export default function CartaPage() {
  return (
    <div className="o-shell">
      <div id="top" />

      <header className="o-header">
        <div className="o-header__inner">
          <HeaderNav />
        </div>
      </header>

      <main className="o-main">
        <section className="o-section" id="carta">
          <header style={{ marginBottom: "1.25rem" }}>
            <p className="o-section__subtitle">Nuestra carta</p>
            <h1 className="o-section__title">
              Pasteleria artesanal para tus momentos especiales
            </h1>
            <p className="o-section__subtitle">
              Encarga tartas, pasteles y dulces que preparamos cada dia en el
              obrador. Podes escribirnos por WhatsApp para ajustar cantidades y
              detalles.
            </p>
          </header>

          <ProductGrid />
        </section>
      </main>

      <Footer />
    </div>
  );
}
