import AdminForm from "@/components/AdminForm";
import AdminList from "@/components/AdminList";
import "@/styles/admin.css";

export default function AdminPage() {
  return (
    <main className="container" style={{ padding: 16 }}>
      <AdminForm />
      <div style={{ height: 24 }} />
      <AdminList />
    </main>
  );
}
