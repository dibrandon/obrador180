import { useEffect, useMemo, useState } from "react";
import { fetchAdminSettings, updateAdminSettings } from "@/lib/settingsApi.js";

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const DEFAULT_OPENING = [
  {
    day: "tuesday",
    slots: [
      { from: "09:00", to: "13:30" },
      { from: "16:30", to: "21:00" },
    ],
  },
  {
    day: "wednesday",
    slots: [
      { from: "09:00", to: "13:30" },
      { from: "16:30", to: "21:00" },
    ],
  },
  {
    day: "thursday",
    slots: [
      { from: "09:00", to: "13:30" },
      { from: "16:30", to: "21:00" },
    ],
  },
  {
    day: "friday",
    slots: [
      { from: "09:00", to: "13:30" },
      { from: "16:30", to: "21:00" },
    ],
  },
  {
    day: "saturday",
    slots: [
      { from: "09:00", to: "14:00" },
      { from: "15:30", to: "21:00" },
    ],
  },
  {
    day: "sunday",
    slots: [
      { from: "09:00", to: "14:00" },
    ],
  },
];

const DAY_LABELS = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

function normalizeOpeningHours(hours) {
  const base = new Map(
    DEFAULT_OPENING.map((d) => [d.day, { day: d.day, slots: d.slots }])
  );

  if (Array.isArray(hours)) {
    hours
      .filter((d) => typeof d?.day === "string")
      .forEach((d) => {
        base.set(d.day, {
          day: d.day,
          slots: Array.isArray(d.slots)
            ? d.slots.map((s) => ({ from: s.from || "", to: s.to || "" }))
            : [],
        });
      });
  }

  DAY_ORDER.forEach((day) => {
    if (!base.has(day)) base.set(day, { day, slots: [] });
  });

  const normalized = Array.from(base.values());
  return normalized.length === 0 ? DEFAULT_OPENING : normalized;
}

function sortHours(hours) {
  return [...hours].sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));
}

function toInputDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export default function AdminSettings() {
  const [openingHours, setOpeningHours] = useState(DEFAULT_OPENING);
  const [vacationFrom, setVacationFrom] = useState("");
  const [vacationTo, setVacationTo] = useState("");
  const [vacationMessage, setVacationMessage] = useState("");
  const [status, setStatus] = useState("loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setStatus("loading");
        const data = await fetchAdminSettings();
        if (cancel) return;
        setOpeningHours(normalizeOpeningHours(data?.openingHours));
        setVacationFrom(toInputDate(data?.vacationFrom));
        setVacationTo(toInputDate(data?.vacationTo));
        setVacationMessage(data?.vacationMessage || "");
        setStatus("ready");
      } catch (err) {
        setStatus("error");
        setMsg(err.message || "No se pudieron cargar los ajustes");
      }
    })();

    return () => { cancel = true; };
  }, []);

  const orderedHours = useMemo(() => sortHours(openingHours), [openingHours]);

  const updateSlot = (day, slotIdx, field, value) => {
    setOpeningHours((prev) => prev.map((d) => {
      if (d.day !== day) return d;
      const slots = [...(d.slots || [])];
      slots[slotIdx] = { ...slots[slotIdx], [field]: value };
      return { ...d, slots };
    }));
  };

  const addSlot = (day) => {
    setOpeningHours((prev) => prev.map((d) => (
      d.day === day ? { ...d, slots: [...(d.slots || []), { from: "", to: "" }] } : d
    )));
  };

  const removeSlot = (day, slotIdx) => {
    setOpeningHours((prev) => prev.map((d) => {
      if (d.day !== day) return d;
      const slots = (d.slots || []).filter((_, idx) => idx !== slotIdx);
      return { ...d, slots };
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setStatus("saving");
    try {
      await updateAdminSettings({
        openingHours,
        vacationFrom: vacationFrom || null,
        vacationTo: vacationTo || null,
        vacationMessage,
      });
      setMsg("Ajustes guardados");
      setStatus("ready");
    } catch (err) {
      setMsg(err.message || "No se pudieron guardar los ajustes");
      setStatus("ready");
    }
  };

  if (status === "loading") {
    return <p>Cargando ajustes...</p>;
  }

  if (status === "error") {
    return <p>{msg || "No se pudieron cargar los ajustes"}</p>;
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit} style={{ maxWidth: 960 }}>
      <h2 className="admin-form__title">Horarios y vacaciones</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {orderedHours.map((day) => (
          <div key={day.day} style={{ border: "1px solid #e3e3e3", borderRadius: 12, padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <strong>{DAY_LABELS[day.day] || day.day}</strong>
              <button
                type="button"
                className="admin-header__btn admin-header__btn--ghost"
                onClick={() => addSlot(day.day)}
              >
                Añadir franja
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(day.slots || []).map((slot, idx) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "center" }}>
                  <input
                    type="time"
                    value={slot.from || ""}
                    onChange={(e) => updateSlot(day.day, idx, "from", e.target.value)}
                    className="admin-form__input"
                  />
                  <input
                    type="time"
                    value={slot.to || ""}
                    onChange={(e) => updateSlot(day.day, idx, "to", e.target.value)}
                    className="admin-form__input"
                  />
                  <button
                    type="button"
                    className="admin-header__btn admin-header__btn--ghost"
                    onClick={() => removeSlot(day.day, idx)}
                  >
                    Quitar
                  </button>
                </div>
              ))}
              {(day.slots || []).length === 0 && (
                <p className="admin-status-text">Día cerrado</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-form__label" style={{ marginTop: 16 }}>
        <span>Vacaciones (desde / hasta)</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
          <input
            type="date"
            className="admin-form__input"
            value={vacationFrom}
            onChange={(e) => setVacationFrom(e.target.value)}
          />
          <input
            type="date"
            className="admin-form__input"
            value={vacationTo}
            onChange={(e) => setVacationTo(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-form__label">
        <span>Mensaje de vacaciones</span>
        <textarea
          className="admin-form__textarea"
          rows={3}
          value={vacationMessage}
          onChange={(e) => setVacationMessage(e.target.value)}
          placeholder="Cerrado por vacaciones del X al Y"
        />
      </div>

      {msg && <p className="admin-form__msg">{msg}</p>}

      <button type="submit" className="admin-form__button" disabled={status === "saving"}>
        {status === "saving" ? "Guardando..." : "Guardar ajustes"}
      </button>
    </form>
  );
}
