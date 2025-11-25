import { Link, useLocation } from "react-router-dom";

export default function HeaderNav() {
  const { pathname } = useLocation();
  const linkClass = (active) =>
    `o-header__link${active ? " o-header__link--active" : ""}`;

  return (
    <div className="o-header__pill">
      <Link to="/" className="o-header__brand">
        <span className="o-header__brand-top">OBRADOR</span>
        <span className="o-header__brand-bottom">180 graus</span>
      </Link>

      <nav className="o-header__nav" aria-label="Navegacion principal">
        <Link to="/" className={linkClass(pathname === "/")}>
          Inicio
        </Link>
        <Link to="/carta" className={linkClass(pathname === "/carta")}>
          Carta
        </Link>
        <a href="/#nosotros" className="o-header__link">
          Nosotros
        </a>
        <a href="/#contacto" className="o-header__link">
          Encargos
        </a>
      </nav>
    </div>
  );
}
