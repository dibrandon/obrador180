const OPTIONS = [
  { value: "compact", label: "Compacto" },
  { value: "cozy", label: "Acogedor" },
  { value: "roomy", label: "Amplio" },
];

function ViewToggle({ value = "cozy", onChange }) {
  return (
    <div className="view-toggle" role="group" aria-label="Cambiar densidad del catalogo">
      {OPTIONS.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={`view-toggle__btn ${isActive ? "is-active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default ViewToggle;
