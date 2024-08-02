import type { SidebarMenu } from './types'

// Example sidebar menu datḁ
const sidebarMenu: SidebarMenu<{ description?: string }> = {
    MAIN: [
        {
            title: 'Dashboard',
            path: '/',
            icon: 'DashboardIcon',
            children: [{ title: 'Main', path: '/' }]
        },
        {
            title: 'Settings',
            path: '/settings',
            icon: 'SettingsIcon',
            children: []
        }
    ],
    OTHERS: [
        {
            title: 'Auth',
            path: '/auth',
            icon: 'AuthIcon',
            children: [
                { title: 'Login', path: '/auth/login' },
                { title: 'Register', path: '/auth/register' }
            ]
        }
    ]
}

export default sidebarMenu
