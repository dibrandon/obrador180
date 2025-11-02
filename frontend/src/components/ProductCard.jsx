export default function ProductCard({ product }){
  const { name, description, price, image } = product;

  const waNumber = import.meta.env.VITE_WA_NUMBER;
  const msg = encodeURIComponent(`Hola, quiero encargar: ${name} — €${price.toFixed(2)}.`);
  const waLink = `https://wa.me/${waNumber}?text=${msg}`;

  return (
    <article className="card">
      <div className="card__media">
        {image ? <img src={image} alt={name} /> : null}
      </div>
      <div className="card__body">
        <div className="ribbon">Obrador 180°</div>
        <h3 className="card__title">{name}</h3>
        <p className="card__desc">{description || '—'}</p>
        <div className="card__price">€{price?.toFixed ? price.toFixed(2) : price}</div>
      </div>
      <a className="button" href={waLink} target="_blank" rel="noreferrer">
        Encargar por WhatsApp
      </a>
    </article>
  );
}
