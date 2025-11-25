function Footer() {
  return (
    <footer className="o-footer" aria-label="Información del obrador">
      <div className="o-footer__title">Obrador 180 graus</div>

      <div className="o-footer__info">
        <div>🤍 Obrador artesanal</div>
        <div>
          <a href="tel:+34622646019">622 646 019</a> /{" "}
          <a href="tel:+34931946903">93 194 69 03</a>
        </div>
        <div>
          Horario:
          <div>Martes a Sábado 8:30–14h / 16–21h</div>
          <div>Domingos y festivos 8:30–14h</div>
        </div>
        <div>
          <a
            href="https://maps.google.com/?q=Rambla+Principal+28+08800+Vilanova+i+la+Geltrú"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rambla Principal 28, 08800 Vilanova i la Geltrú
          </a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/obrador180graus/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="o-footer__version">
        <div className="o-version">v1.0 — MVP</div>
      </div>

      <div className="o-footer__meta">© 2025 – Obrador 180 graus</div>
    </footer>
  );
}

export default Footer;
