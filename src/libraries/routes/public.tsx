import Dashboard from "../../pages/Dashboard"
import { RegisterPage } from "../../pages/RegisterPage"
import { LoginPage } from "../../pages/LoginPage"

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
