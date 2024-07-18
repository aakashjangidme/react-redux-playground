import { lazy } from "react"
import Loadable from "../../components/lazy"

import type { RouteObject } from "react-router-dom"
import NotFoundPage from "../../pages/fallback/not-found"
import DefaultLayout from "../../components/layout/DefaultLayout"
import Dashboard from "../../pages/dashboard/dashboard"

// Lazy load the authentication pages
const AuthLogin = Loadable(
  lazy(() => import("../../pages/authentication/login")),
)

const AuthRegister = Loadable(
  lazy(() => import("../../pages/authentication/register")),
)

const PublicRoutes: RouteObject = {
  id: "root",
  path: "/",
  element: <DefaultLayout />,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "register",
      element: <AuthRegister />,
    },
    {
      path: "*",
      Component: NotFoundPage,
    },
  ],
}

export default PublicRoutes
