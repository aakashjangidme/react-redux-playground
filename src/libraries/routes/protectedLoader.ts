import type { LoaderFunctionArgs } from "react-router-dom"
import { redirect } from "react-router-dom"
import logger from "../../utils/logger"

function protectedLoader({ request }: LoaderFunctionArgs) {
  let isAuthenticated = false
  logger.log("ProtectedRoute::isAuthenticated", isAuthenticated)
  logger.log("ProtectedRoute::pathname", request)

  if (!isAuthenticated) {
    let params = new URLSearchParams()
    params.set("from", new URL(request.url).pathname)
    return redirect("/login?" + params.toString())
  }

  return null
}

export default protectedLoader
