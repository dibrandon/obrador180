import { useNavigate } from "react-router-dom";
import AdminForm from "@/components/AdminForm";
import AdminList from "@/components/AdminList";
import { clearAdminKey } from "@/lib/api";
import "@/styles/admin.css";

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
    <main className="container" style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Panel administrador
        </h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={goToDashboard}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "0.45rem 0.9rem",
              background: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Volver al dashboard
          </button>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "0.45rem 0.9rem",
              background: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Salir
          </button>
        </div>
      </div>

      <AdminForm />
      <div style={{ height: 24 }} />
      <AdminList />
    </main>
  );
}
