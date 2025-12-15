import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProjectsPage from "../pages/ProjectsPage";
import TodosPage from "../pages/TodosPage";
import { AuthGuard } from "../shared/auth/AuthGuard";
import RegisterPage from "../pages/RegisterPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: (
      <AuthGuard>
        <ProjectsPage />
      </AuthGuard>
    ),
  },
  {
    path: "/projects/:projectId",
    element: (
      <AuthGuard>
        <TodosPage />
      </AuthGuard>
    ),
  },
]);
