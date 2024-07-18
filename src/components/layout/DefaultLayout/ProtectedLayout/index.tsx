import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../../../store/hooks"
import ErrorBoundary from "../../../ErrorBoundary"

const ProtectedLayout = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate replace to={"/login"} />
  }

  return (
    <>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  )
}

export default ProtectedLayout
