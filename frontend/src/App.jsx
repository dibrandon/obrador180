import HeaderNav from './components/HeaderNav';
import ProductGrid from './components/ProductGrid';

function App() {
  return (
    <main className="container">
      <HeaderNav />

      <section style={{ marginTop: 24 }}>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Nuestra carta base</h1>
        <p style={{ opacity: 0.85, marginTop: 6, maxWidth: 620 }}>
          Hechos con ingredientes nobles y paciencia artesanal.
          Elegí tus favoritos y coordiná tu pedido por WhatsApp.
        </p>
      </section>

      <section id="carta" style={{ marginTop: 16 }}>
        <ProductGrid />
      </section>
    </main>
  );
}
export default App;