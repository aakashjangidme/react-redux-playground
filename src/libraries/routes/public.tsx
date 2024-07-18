import { LoginPage } from "../../pages/authentication/login"
import { RegisterPage } from "../../pages/authentication/register"
import Dashboard from "../../pages/Dashboard"

export const publicRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]
