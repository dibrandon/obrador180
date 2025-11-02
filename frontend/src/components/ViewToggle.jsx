import { useEffect, useState } from 'react';

const KEY = 'viewDensity';
const ORDER = ['compact', 'cozy', 'roomy']; // ciclo

function ViewToggle({ showLabelsOnDesktop = false }) {
  const [mode, setMode] = useState(
    document.documentElement.getAttribute('data-density') || 'cozy'
  );

  // Sincroniza atributo + storage al cambiar
  useEffect(() => {
    document.documentElement.setAttribute('data-density', mode);
    localStorage.setItem(KEY, mode);
  }, [mode]);

  // Cicla compact -> cozy -> roomy -> compact
  const next = () => {
    const idx = ORDER.indexOf(mode);
    setMode(ORDER[(idx + 1) % ORDER.length]);
  };

  // Icono simple: 2x2 cuadritos con densidad variable
  return (
    <div className="viewtoggle">
      <button
        className="viewtoggle__icon"
        onClick={next}
        aria-label={`Cambiar vista (actual: ${
          mode === 'compact' ? 'Compacta' : mode === 'cozy' ? 'Cómoda' : 'Amplia'
        })`}
        title={`Vista: ${mode === 'compact' ? 'Compacta' : mode === 'cozy' ? 'Cómoda' : 'Amplia'}`}
      >
        {/* SVG inline: cambia “espaciado” según modo */}
        <svg width="22" height="22" viewBox="0 0 24 24">
          <g>
            <rect x="3"  y="3"  width="8" height="8" rx="2"></rect>
            <rect x="13" y="3"  width="8" height="8" rx="2"></rect>
            <rect x="3"  y="13" width="8" height="8" rx="2"></rect>
            <rect x="13" y="13" width="8" height="8" rx="2"></rect>
          </g>
        </svg>
        {/* Etiquetas opcionales solo en desktop */}
        {showLabelsOnDesktop && (
          <div className="viewtoggle__labels">
            <span className={mode==='compact'?'on':''}>Compacta</span>
            <span className={mode==='cozy'?'on':''}>Cómoda</span>
            <span className={mode==='roomy'?'on':''}>Amplia</span>
          </div>
        )}
      </button>
    </div>
  );
}

export default ViewToggle;

