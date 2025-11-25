import { Routes, Route } from "react-router-dom";
import App from "@/App.jsx";
import CartaPage from "@/pages/Carta.jsx";
import AdminPage from "@/pages/Admin.jsx";
import AdminLogin from "@/pages/AdminLogin.jsx";
import NotFound from "@/pages/NotFound.jsx";
import AdminGuard from "@/routes/AdminGuard.jsx";
import Dashboard from "@/pages/Dashboard.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/carta" element={<CartaPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminGuard>
            <Dashboard />
          </AdminGuard>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminGuard>
            <AdminPage />
          </AdminGuard>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
