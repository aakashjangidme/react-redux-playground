import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'

import ErrorBoundary from '@/components/ErrorBoundry'
import logger from '@/lib/utils/logger'

const ProtectedLayout = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.data?.accessToken !== null)

    const { pathname } = useLocation()

    logger.log('ProtectedLayout', { isAuthenticated, pathname })

    if (!isAuthenticated) {
        return <Navigate to={'/login'} state={{ from: pathname }} replace />
    }

    return (
        <div className=" dark:bg-boxdark-2 dark:text-bodydark">
            <div className="overflow-hidden">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default ProtectedLayout
