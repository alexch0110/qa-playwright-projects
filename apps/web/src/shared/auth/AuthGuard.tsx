import { Navigate } from "react-router-dom";
import { isAuthed } from "./token";
import type { ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  if (!isAuthed()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
