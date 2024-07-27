import { lazy } from 'react'
import Loadable from '../components/Lazy'

import type { RouteObject } from 'react-router-dom'

import DefaultLayout from '../components/Layout/DefaultLayout'
import DashboardLayout from '../components/Layout/DashboardLayout'
import { ROUTES } from './routes-constants'

// Lazy load the authentication pages
const AuthLogin = Loadable(lazy(() => import('../features/auth/pages/login')))

const AuthRegister = Loadable(lazy(() => import('../features/auth/pages/register')))

const DashboardHomePage = Loadable(lazy(() => import('../features/dashboard/pages')))

const NotFoundPage = Loadable(lazy(() => import('../components/NotFound/NotFoundDefaultPage')))

const PublicRoutes: RouteObject = {
    id: 'root',
    path: '/',
    element: <DefaultLayout />,
    errorElement: <NotFoundPage />,
    children: [
        {
            path: ROUTES.LOGIN_ROUTE,
            element: <AuthLogin />
        },
        {
            path: ROUTES.REGISTER_ROUTE,
            element: <AuthRegister />
        },
        {
            path: '',
            element: <DashboardLayout />,
            children: [{ index: true, element: <DashboardHomePage /> }]
        }
    ]
}

export default PublicRoutes
