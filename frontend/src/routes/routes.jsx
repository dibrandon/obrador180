import { Routes, Route } from 'react-router-dom';
import App from '@/App.jsx';
import AdminPage from '@/pages/Admin.jsx';
import NotFound from '@/pages/NotFound.jsx';
import AdminGuard from '@/routes/AdminGuard.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
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
