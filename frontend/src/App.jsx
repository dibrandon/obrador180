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
                <strong>Encargos por WhatsApp</strong> — recogida en obrador —
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

        {/* NOSOTROS */}
        <section id="nosotros" className="o-section o-section--muted">
          <header style={{ marginBottom: "1rem" }}>
            <h2 className="o-section__title">Nosotros</h2>
            <p className="o-section__subtitle">
              Obrador pequeño, corazón grande: hornos encendidos a diario,
              recetas probadas y un equipo que ama lo que hace.
            </p>
          </header>
          <p className="hero__text">
            Trabajamos con proveedores locales y seleccionamos ingredientes
            honestos para que cada torta y pastel llegue con sabor, textura y
            presencia de revista. Preparados para celebraciones, regalos o
            endulzar cualquier día.
          </p>
        </section>

        {/* CONTACTO / ENCARGOS */}
        <section id="contacto" className="o-section">
          <header style={{ marginBottom: "1rem" }}>
            <h2 className="o-section__title">Encargos y contacto</h2>
            <p className="o-section__subtitle">
              Cuéntanos qué necesitas y coordinamos por WhatsApp. También puedes
              pasar por el obrador para cerrar detalles.
            </p>
          </header>
          <div className="hero__actions">
            <a href="#carta" className="c-btn c-btn--primary">
              Ver carta y encargar
            </a>
            <span className="hero__tagline">
              Elige un básico y lo personalizamos: tamaños, decoraciones y
              sabores de temporada.
            </span>
          </div>
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
