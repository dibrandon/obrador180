const VIEWS = [
  { id: "activos", label: "Activos" },
  { id: "pausados", label: "Pausados" },
  { id: "todos", label: "Todos" },
  { id: "nuevo", label: "Nuevo producto" },
  { id: "ajustes", label: "Horarios" },
];

export default function AdminNav({ view, onChange }) {
  return (
    <nav className="admin-nav" aria-label="Navegación del panel">
      {VIEWS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={
            "admin-nav__btn" + (view === id ? " admin-nav__btn--active" : "")
          }
          onClick={() => onChange?.(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
