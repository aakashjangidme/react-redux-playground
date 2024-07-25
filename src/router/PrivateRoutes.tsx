// import protectedLoader from "./protectedLoader"
import type { RouteObject } from 'react-router-dom'
// import ProtectedLayout from '../components/Layout/ProtectedLayout'

import DashboardLayout from '../components/Layout/DashboardLayout'

import { lazy } from 'react'
import Loadable from '../components/Lazy'
import ProtectedLayout from '../components/Layout/ProtectedLayout'

const NotFoundPage = Loadable(lazy(() => import('../components/NotFound/NotFoundDefaultPage')))
const DashboardHomePage = Loadable(lazy(() => import('../features/dashboard/pages')))

const PrivateRoutes: RouteObject = {
  id: 'private',
  path: '/',
  element: <ProtectedLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardLayout />,

      children: [{ index: true, element: <DashboardHomePage /> }],
    },
  ],
}

export default PrivateRoutes
