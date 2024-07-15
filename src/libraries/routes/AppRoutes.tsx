import React from "react"
import type { RouteObject } from "react-router-dom"
import { useRoutes } from "react-router-dom"
import { publicRoutes } from "./public"
import { privateRoutes } from "./private"
import { fallbackRoute } from "./fallback"
import { ProtectedRoute } from "../../components/ProtectedRoute"

type Route = {
  path: string
  element: JSX.Element
}

export function AppRoutes() {
  const parseRouteObjects = (
    routes: Route[],
    isPrivate: boolean = false,
  ): RouteObject[] => {
    // logger.log("AppRoutes::routes=", routes)
    // logger.log("AppRoutes::isPrivate=", isPrivate)
    return routes.map(route => ({
      path: route.path,
      element: isPrivate ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
      ) : (
        route.element
      ),
    }))
  }

  const publicRouteObjects = parseRouteObjects(publicRoutes)
  const privateRouteObjects = parseRouteObjects(privateRoutes, true)
  const fallbackRouteObjects = parseRouteObjects(fallbackRoute)

  const routes = [
    ...publicRouteObjects,
    ...privateRouteObjects,
    ...fallbackRouteObjects,
  ]

  const allRoutes = useRoutes(routes)

  return <React.Fragment> {allRoutes} </React.Fragment>
}
