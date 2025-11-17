import { useNavigate } from "react-router-dom";
import AdminForm from "@/components/AdminForm";
import AdminList from "@/components/AdminList";
import { clearAdminKey } from "@/lib/api";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminKey();
    navigate("/admin/login", { replace: true });
  };

  const goToDashboard = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <h1 className="admin-header__title">Panel administrador</h1>
        <div className="admin-header__actions">
          <button
            type="button"
            className="admin-header__btn admin-header__btn--ghost"
            onClick={goToDashboard}
          >
            Volver al dashboard
          </button>
          <button
            type="button"
            className="admin-header__btn"
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </header>

      <main className="admin-main">
        <section aria-label="Alta y edición de productos">
          <AdminForm />
        </section>

        <section aria-label="Listado y gestión de productos" className="admin-main__list">
          <AdminList />
        </section>
      </main>
    </div>
  );
}
