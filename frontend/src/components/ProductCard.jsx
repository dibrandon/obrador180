export default function ProductCard({ product }) {
  const { name, description, price, image } = product;
  const fmt = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  const waNumber = (import.meta.env.VITE_WA_NUMBER || "").trim();
  const hasWhatsApp = Boolean(waNumber);

  const numericPrice = Number(price);
  const hasValidPrice =
    price !== "" && price !== null && price !== undefined && Number.isFinite(numericPrice);
  const displayPrice = hasValidPrice ? fmt.format(numericPrice) : "Consultar";

  const descriptionText =
    (description || "").trim() ||
    "Pronto añadiremos la descripción de este producto.";

  const productName = name || "un producto";
  const waMessage = `Hola, quiero encargar: ${productName}${
    hasValidPrice ? ` – ${displayPrice}` : ""
  }.`;

  const waLink = hasWhatsApp
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`
    : "#";

  return (
    <article className="card">
      <div className="card__media">
        {image ? <img src={image} alt={name} /> : null}
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
        onClick={
          hasWhatsApp
            ? undefined
            : (event) => {
                event.preventDefault();
              }
        }
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
