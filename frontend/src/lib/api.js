const BASE = import.meta.env.VITE_API_BASE;

export async function getProducts(){
  const res = await fetch(`${BASE}/products`);
  if(!res.ok) throw new Error(`API /products ${res.status}`);
  return res.json();
}
