import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../shared/auth/token";
import { Button } from "./Button";

export function Layout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  function logout() {
    clearToken();
    navigate("/login");
  }

  return (
    <div className="min-h-full">
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold tracking-wide">
            QA Playwright Project
          </Link>

          <div className="flex items-center gap-2">
            <div className="text-sm text-slate-300">{title}</div>
            <Button onClick={logout} className="ml-4">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
