// import protectedLoader from "./protectedLoader"
import type { RouteObject } from 'react-router-dom'
// import ProtectedLayout from '../components/Layout/ProtectedLayout'

import { lazy } from 'react'
import { ROUTES } from './routes-constants'

import sideMenuItems from '@/config/sideMenuItems'

import Loadable from '@/components/Lazy'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import navMenuItems from '@/config/navMenuItems'

const NotFoundPage = Loadable(lazy(() => import('@/components/NotFound/NotFoundDefaultPage')))
const DashboardHomePage = Loadable(lazy(() => import('@/features/dashboard/pages')))

const PrivateRoutes: RouteObject = {
    id: 'private',
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
        {
            path: ROUTES.DASHBOARD_ROUTE,
            element: <DashboardLayout dashboardBranding={{ title: 'DashboardX' }} navMenuItems={navMenuItems} sideMenuItems={sideMenuItems} />,
            children: [{ index: true, element: <DashboardHomePage /> }]
        }
    ]
}

export default PrivateRoutes
