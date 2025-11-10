import AdminForm from "@/components/AdminForm";
import AdminList from "@/components/AdminList";
import { clearAdminKey } from "@/lib/api";
import "@/styles/admin.css";

export default function AdminPage() {
  const handleLogout = () => {
    clearAdminKey();
    if (typeof window !== "undefined") {
      window.location.replace("/admin/login");
    }
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
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Panel administrador
        </h1>
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

      <AdminForm />
      <div style={{ height: 24 }} />
      <AdminList />
    </main>
  );
}
