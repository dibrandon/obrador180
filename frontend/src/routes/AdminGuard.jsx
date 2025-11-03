import { useMemo } from 'react';

export default function AdminGuard({ children }) {
  const kEnv = import.meta.env.VITE_ADMIN_KEY || '';
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const kURL = params.get('k') || '';

  if (!kEnv) {
    return (
      <div className="admin-guard">
        <h1>Admin deshabilitado</h1>
        <p>Falta configurar <code>VITE_ADMIN_KEY</code> en el frontend.</p>
      </div>
    );
  }
  if (kURL !== kEnv) {
    return (
      <div className="admin-guard">
        <h1>No autorizado</h1>
        <p>Añade tu clave a la URL para continuar.</p>
      </div>
    );
  }
  return children;
}
