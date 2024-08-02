import { Outlet } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundry'

// ==============================|| MINIMAL LAYOUT ||============================== //

const DefaultLayout = () => {
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

export default DefaultLayout
