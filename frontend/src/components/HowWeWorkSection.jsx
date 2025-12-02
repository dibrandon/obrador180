export default function HowWeWorkSection() {
  return (
    <section className="o-section" id="como-trabajamos">
      <div className="how-work">
        <header className="how-work__header">
          <h2 className="o-section__title">Cómo trabajamos</h2>
          <p className="o-section__subtitle">
            Obrador 180 graus es una pastelería de producción diaria. Trabajamos bajo encargo
            y con una selección cuidada de productos listos para llevar.
          </p>
        </header>

        <div className="how-work__grid">
          <article className="how-work__step">
            <h3>1. Hablamos de tu pedido</h3>
            <p>
              Nos contactas por WhatsApp y nos cuentas qué necesitas: cantidad, fecha y si hay
              alguna alergia o preferencia especial.
            </p>
          </article>

          <article className="how-work__step">
            <h3>2. Lo preparamos en el obrador</h3>
            <p>
              Trabajamos con masas y cremas recién hechas, sin producciones masivas. Ajustamos el
              calendario para que tu encargo esté en su punto.
            </p>
          </article>

          <article className="how-work__step">
            <h3>3. Recoges o coordinamos entrega</h3>
            <p>
              Pasas por el obrador dentro del horario acordado o valoramos opciones de entrega
              según la zona. Siempre con trato directo.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
