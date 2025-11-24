export default function AdminStatusBar({ stats }) {
  const {
    total = 0,
    activos = 0,
    pausados = 0,
  } = stats || {};

  return (
    <header className="admin-statusbar">
      <div className="admin-statusbar__title">
        <h1>Panel de productos</h1>
        <p>Resumen rápido del estado de la carta.</p>
      </div>

      <div className="admin-statusbar__chips">
        <div className="admin-statusbar__chip">
          <span className="admin-statusbar__chip-label">Totales</span>
          <span className="admin-statusbar__chip-value">{total}</span>
        </div>

        <div className="admin-statusbar__chip admin-statusbar__chip--ok">
          <span className="admin-statusbar__chip-label">Activos</span>
          <span className="admin-statusbar__chip-value">{activos}</span>
        </div>

        <div className="admin-statusbar__chip admin-statusbar__chip--warn">
          <span className="admin-statusbar__chip-label">Pausados</span>
          <span className="admin-statusbar__chip-value">{pausados}</span>
        </div>
      </div>
    </header>
  );
}
