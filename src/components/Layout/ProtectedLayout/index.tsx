import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from 'src/store/hooks'

import ErrorBoundary from 'src/components/ErrorBoundry'
import logger from 'src/utils/logger'

const ProtectedLayout = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

    const location = useLocation()

    logger.log('ProtectedRoute::isAuthenticated', isAuthenticated)
    logger.log('ProtectedRoute::pathname', location)

    if (!isAuthenticated) {
        const params = new URLSearchParams()
        params.set('from', location.pathname)
        return <Navigate to={'/login?' + params.toString()} />
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
