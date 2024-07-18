// import protectedLoader from "./protectedLoader"
import type { RouteObject } from "react-router-dom"
import ProtectedLayout from "../../components/layout/DefaultLayout/ProtectedLayout"
import Dashboard from "../../pages/dashboard/dashboard"

const PrivateRoutes: RouteObject = {
  id: "private",
  path: "/",
  element: <ProtectedLayout />,
  children: [
    {
      path: "dashboard",
      // loader: protectedLoader,
      element: <Dashboard />,
    },
  ],
}

export default PrivateRoutes
