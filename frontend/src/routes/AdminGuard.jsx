import { useEffect, useState } from "react";
import { isAuthedLocally, verifyAdminKey } from "@/lib/api";

function redirectToLogin() {
  if (typeof window === "undefined") return;
  const next = encodeURIComponent(
    window.location.pathname + window.location.search
  );
  window.location.replace(`/admin/login?next=${next}`);
}

export default function AdminGuard({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isAuthedLocally()) {
        if (!cancelled) setStatus("denied");
        redirectToLogin();
        return;
      }
      const valid = await verifyAdminKey();
      if (!valid) {
        if (!cancelled) setStatus("denied");
        redirectToLogin();
        return;
      }
      if (!cancelled) setStatus("allowed");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status !== "allowed") return null;
  return children;
}
