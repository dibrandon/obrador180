import { useEffect, useMemo, useState } from "react";

export default function ProductCard({ product }) {
  const { name, description, price, image, gallery = [] } = product;
  const fmt = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  const slides = useMemo(() => {
    const urls = [];
    if (typeof image === "string" && image.trim()) urls.push(image.trim());
    if (Array.isArray(gallery)) {
      gallery.forEach((item) => {
        if (typeof item === "string" && item.trim()) {
          urls.push(item.trim());
        }
      });
    }
    return urls;
  }, [image, gallery]);

  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    setSlideIdx(0);
  }, [slides.length]);

  const currentImage = slides[slideIdx] || null;
  const hasMultiple = slides.length > 1;

  const waNumber = (import.meta.env.VITE_WA_NUMBER || "").trim();
  const hasWhatsApp = Boolean(waNumber);

  const numericPrice = Number(price);
  const hasValidPrice =
    price !== "" && price !== null && price !== undefined && Number.isFinite(numericPrice);
  const displayPrice = hasValidPrice ? fmt.format(numericPrice) : "Consultar";

  const descriptionText =
    (description || "").trim() ||
    "Pastelería artesanal hecha a mano, elaborada con ingredientes nobles.";

  const productName = name || "un producto";
  const waMessage = `Hola, me interesa el producto "${productName}". ¿Me podés contar un poco más?`;

  const waLink = hasWhatsApp
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`
    : "#";

  const goToSlide = (index) => {
    if (!hasMultiple) return;
    const next = (index + slides.length) % slides.length;
    setSlideIdx(next);
  };

  return (
    <article className="card">
      <div className="card__media">
        {currentImage ? <img src={currentImage} alt={name} loading="lazy" /> : null}
        {hasMultiple && (
          <div className="card__slider-controls">
            <button type="button" onClick={() => goToSlide(slideIdx - 1)} aria-label="Anterior">
              {"<"}
            </button>
            <span className="card__slider-dots" aria-label="Seleccionar foto">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={idx === slideIdx ? "is-active" : ""}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Foto ${idx + 1}`}
                />
              ))}
            </span>
            <button type="button" onClick={() => goToSlide(slideIdx + 1)} aria-label="Siguiente">
              {">"}
            </button>
          </div>
        )}
      </div>
      <div className="card__body">
        <h3 className="card__title">{name}</h3>
        <p className="card__desc">{descriptionText}</p>
        <div className="card__price">{displayPrice}</div>
      </div>
      <a
        className="button"
        href={waLink}
        target={hasWhatsApp ? "_blank" : undefined}
        rel={hasWhatsApp ? "noreferrer" : undefined}
        aria-disabled={!hasWhatsApp}
        onClick=
          {hasWhatsApp
            ? undefined
            : (event) => {
                event.preventDefault();
              }}
        title={
          hasWhatsApp
            ? "Encargar por WhatsApp"
            : "Configura VITE_WA_NUMBER para habilitar este botón"
        }
      >
        Encargar por WhatsApp
      </a>
    </article>
  );
}
