import type React from "react"
import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../features/auth/useAuth"
import logger from "../utils/logger"

export function ProtectedRoute({ children }: React.PropsWithChildren) {
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()
  logger.log("ProtectedRoute::isAuthenticated", isAuthenticated)
  logger.log("ProtectedRoute::pathname", pathname)

  if (!isAuthenticated && pathname) {
    return <Navigate to="/login" state={{ from: pathname }} />
  }

  return children
}
