export default function HeaderNav() {
  return (
    <div className="o-header__pill">
      <a href="#top" className="o-header__brand">
        <span className="o-header__brand-top">OBRADOR</span>
        <span className="o-header__brand-bottom">180º graus</span>
      </a>

      <nav className="o-header__nav" aria-label="Navegación principal">
        <a href="#top" className="o-header__link">
          Inicio
        </a>
        <a href="#carta" className="o-header__link o-header__link--active">
          Carta
        </a>
        <a href="#nosotros" className="o-header__link">
          Nosotros
        </a>
        <a href="#contacto" className="o-header__link">
          Encargos
        </a>
      </nav>
    </div>
  );
}
