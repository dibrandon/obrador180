import HeaderNav from "./components/HeaderNav";
import ProductGrid from "./components/ProductGrid";

function App() {
  return (
    <div className="o-shell">
      {/* Ancla para "Inicio" */}
      <div id="top" />

      {/* Barra superior */}
      <header className="o-header">
        <div className="o-header__inner">
          <HeaderNav />
        </div>
      </header>

      <main className="o-main">
        {/* HERO principal */}
        <section className="o-section o-section--hero">
          <div className="hero">
            <div className="hero__content">
              <h1 className="hero__title">
                Pastelería artesanal
                <span className="hero__highlight"> de Vilanova</span>
              </h1>

              <p className="hero__text">
                Tortas, pasteles y dulces hechos a mano, con ingredientes nobles
                y el ritmo lento de un obrador de verdad.
              </p>

              <p className="hero__meta">
                <strong>Encargos por WhatsApp</strong> · recogida en obrador ·
                opciones para celebraciones y eventos.
              </p>

              <div className="hero__actions">
                <a href="#carta" className="c-btn c-btn--primary">
                  Ver carta
                </a>
                <span className="hero__tagline">
                  Empieza por la carta base y luego afinamos tu pedido juntos.
                </span>
              </div>
            </div>

            <div className="hero__visual" aria-hidden="true" />
          </div>
        </section>

        {/* CARTA BASE */}
        <section id="carta" className="o-section">
          <header style={{ marginBottom: "1rem" }}>
            <h2 className="o-section__title">Nuestra carta</h2>
            <p className="o-section__subtitle">
              Hechos con ingredientes nobles y paciencia artesanal.
              Elegí tus favoritos y coordiná tu pedido por WhatsApp.
            </p>
          </header>

          <ProductGrid />
        </section>
      </main>

      <footer className="o-footer">
        <div className="o-footer__inner">
          <span>© {new Date().getFullYear()} Obrador 180 graus.</span>
          <span>MVP v0.9-pre · Sitges / Vilanova</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
