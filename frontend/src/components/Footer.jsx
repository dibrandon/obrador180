import { useEffect, useState } from "react";
import { fetchSettings } from "@/lib/settingsApi.js";

const DAY_LABELS = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

const FALLBACK_OPENING_HOURS = [
  {
    day: "monday",
    slots: [],
  },
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

function formatSlots(slots) {
  if (!Array.isArray(slots) || slots.length === 0) return "Cerrado";
  return slots.map((s) => `${s.from}–${s.to}`).join(" / ");
}

function isNowInVacationRange(vacationFrom, vacationTo) {
  if (!vacationFrom || !vacationTo) return false;
  const now = new Date();
  const from = new Date(vacationFrom);
  const to = new Date(vacationTo);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return false;
  return now >= from && now <= to;
}

function normalizeOpeningHours(openingHours) {
  if (!Array.isArray(openingHours)) return FALLBACK_OPENING_HOURS;
  const merged = openingHours.filter((d) => typeof d?.day === "string");
  return merged.length > 0 ? merged : FALLBACK_OPENING_HOURS;
}

function sortDays(hours) {
  const order = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return [...hours].sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
}

function Footer() {
  const [openingHours, setOpeningHours] = useState(FALLBACK_OPENING_HOURS);
  const [vacationFrom, setVacationFrom] = useState(null);
  const [vacationTo, setVacationTo] = useState(null);
  const [vacationMessage, setVacationMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await fetchSettings();
        if (!isMounted) return;

        setOpeningHours(normalizeOpeningHours(data?.openingHours));
        setVacationFrom(data?.vacationFrom || null);
        setVacationTo(data?.vacationTo || null);
        setVacationMessage(data?.vacationMessage || "");
      } catch (err) {
        console.warn("No se pudieron cargar los horarios de settings", err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const orderedHours = sortDays(openingHours);
  const showVacationBanner = isNowInVacationRange(vacationFrom, vacationTo);

  return (
    <footer className="o-footer" aria-label="Información del obrador">
      <div className="o-footer__title">Obrador 180 graus</div>

      <div className="o-footer__info">
        <div>Obrador artesanal</div>
        <div>
          <a href="tel:+34622646019">622 646 019</a> /{" "}
          <a href="tel:+34931946903">93 194 69 03</a>
        </div>
        <div>
          Horario:
          <div className="o-footer__hours">
            {orderedHours.map((entry) => (
              <div key={entry.day} className="o-footer__hours-row">
                <span className="o-footer__hours-day">{DAY_LABELS[entry.day] || entry.day}</span>
                <span className="o-footer__hours-slots">{formatSlots(entry.slots)}</span>
              </div>
            ))}
          </div>
        </div>
        {showVacationBanner && (
          <div className="o-footer__vacation">
            {vacationMessage && vacationMessage.trim().length > 0
              ? vacationMessage
              : "Cerrado por vacaciones"}
          </div>
        )}
        <div>
          <a
            href="https://maps.google.com/?q=Rambla+Principal+28+08800+Vilanova+i+la+Geltr%C3%BA"
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
        <div className="o-version">v0.9 · MVP</div>
      </div>

      <div className="o-footer__meta">© 2025 · Obrador 180 graus</div>
    </footer>
  );
}

export default Footer;
