import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { neon } from "../lib/neon";

export default function AuthGate({ children }: { children: ReactNode }) {
  const session = neon.auth.useSession();
  const location = useLocation();

  if (session.isPending) {
    return <div className="auth-loading"><div className="auth-loading-card"><span className="brand-mark">SC</span><strong>SCMS Management</strong><span>Checking secure session…</span></div></div>;
  }

  if (!session.data?.user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
