export default function PromoCard() {
  return (
    <section className="promo-card" aria-label="Vídeo del obrador en Instagram">
      <h3 className="promo-card__title">Conocé el obrador por dentro</h3>

      <p className="promo-card__text">
        Mirá este vídeo donde se ve cómo trabajamos cada día para ofrecer
        pastelería artesanal y deliciosa.
      </p>

      <a
        href="https://www.instagram.com/reel/DDkh_8OoFcT/"
        target="_blank"
        rel="noopener noreferrer"
        className="promo-card__btn"
      >
        Ver vídeo en Instagram
      </a>
    </section>
  );
}
