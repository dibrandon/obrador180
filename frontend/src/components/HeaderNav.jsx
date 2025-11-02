import { useEffect, useState } from 'react';
import ViewToggle from './ViewToggle';

function HeaderNav() {
  const waNumber = import.meta.env.VITE_WA_NUMBER;
  const msg = encodeURIComponent("Hola 👋 Me gustaría hacer un pedido.");
  const waLink = `https://wa.me/${waNumber}?text=${msg}`;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header sticky ${scrolled ? 'header--scrolled' : ''}`} id="inicio">
      <div className="brand">Obrador 180°</div>
      <nav className="nav">
        <a href="#inicio">Inicio</a>
        <a href="#carta">Carta</a>
        <a href={waLink} target="_blank" rel="noreferrer">Encargar</a>
      </nav>
      <span className="badge">MVP v0.5</span>
      <ViewToggle showLabelsOnDesktop={false} />
    </header>
  );
}
export default HeaderNav;