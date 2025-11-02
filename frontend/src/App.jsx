import ProductGrid from './components/ProductGrid';

function App() {
  return (
    <main className="container">
      <header className="header">
        <div className="brand">Obrador 180°</div>
        <span className="badge">MVP v0.4</span>
      </header>

      <h1 style={{ marginTop: 16, fontSize: '1.6rem' }}>Carta base</h1>
      <p style={{ opacity: 0.85, marginTop: 6 }}>
        Selección inicial de productos. Pide por WhatsApp y coordinamos entrega.
      </p>

      <ProductGrid />
    </main>
  );
}

export default App;