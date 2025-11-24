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
                Encargos por WhatsApp · recogida en obrador · opciones
                personalizadas para celebraciones y eventos.
              </p>

              <div className="hero__actions">
                <a href="#carta" className="c-btn c-btn--primary">
                  Ver carta
                </a>
                <span className="hero__tagline">
                  Empezá por la carta base y luego afinamos tu pedido juntos.
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
              Hechos con ingredientes nobles y paciencia artesanal. Elegí tus
              favoritos y coordiná tu pedido por WhatsApp.
            </p>
          </header>

          <ProductGrid />
        </section>

        {/* NOSOTROS */}
        <section id="nosotros" className="o-section o-section--muted">
          <header style={{ marginBottom: "1rem" }}>
            <h2 className="o-section__title">Sobre nosotros</h2>
            <p className="o-section__subtitle">
              Un pequeño obrador con la mirada puesta en lo esencial: sabor,
              honestidad y cercanía.
            </p>
          </header>
          <p className="hero__text">
            Obrador 180º graus nace con una idea simple: recuperar la pastelería
            de barrio. Pequeñas producciones, recetas propias y el tiempo
            necesario para que cada pieza salga como tiene que salir.
          </p>
          <p className="hero__text">
            Trabajamos por encargo para garantizar frescura y calidad. Creemos
            en el trato directo, en escuchar lo que querés y en buscar juntos la
            mejor opción para cada ocasión.
          </p>
          <p className="hero__text">
            Si tenés una celebración especial, una reunión familiar o
            simplemente ganas de algo rico, estamos acá para hacerlo realidad.
          </p>
        </section>

        {/* CONTACTO / ENCARGOS */}
        <section id="contacto" className="o-section">
          <header style={{ marginBottom: "1rem" }}>
            <h2 className="o-section__title">Encargos y consultas</h2>
            <p className="o-section__subtitle">
              Coordinemos tu pedido por WhatsApp: fecha, horario de entrega y
              cualquier ajuste personalizado que necesites.
            </p>
          </header>
          <div className="hero__actions">
            <a href="#carta" className="c-btn c-btn--primary">
              Hablar por WhatsApp
            </a>
            <span className="hero__tagline">
              Respondemos lo antes posible. Encargos sujetos a disponibilidad.
            </span>
          </div>
        </section>
      </main>

      <footer className="o-footer">
        <div className="o-footer__inner">
          <span>© {new Date().getFullYear()} Obrador 180 graus.</span>
          <span>MVP v0.9 Sitges / Vilanova</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
