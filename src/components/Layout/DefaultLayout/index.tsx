import { Outlet } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundry'

// ==============================|| MINIMAL LAYOUT ||============================== //

const DefaultLayout = () => {
    return (
        <>
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </>
    )
}

export default DefaultLayout
