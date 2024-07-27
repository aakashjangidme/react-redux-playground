import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from 'src/store/hooks'

import ErrorBoundary from 'src/components/ErrorBoundry'
import logger from 'src/utils/logger'

const ProtectedLayout = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.data?.accessToken !== null)

    const { pathname } = useLocation()

    logger.log('ProtectedLayout', { isAuthenticated, pathname })

    if (!isAuthenticated) {
        return <Navigate to={'/login'} state={{ from: pathname }} replace />
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
