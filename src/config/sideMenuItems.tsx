import { mdiViewDashboard, mdiTrendingUp, mdiCogs } from '@mdi/js'
import Icon from 'src/components/Icon'

const sideMenuItems = [
    {
        label: 'Dashboard',
        href: '/',
        icon: (
            <Icon
                path={mdiViewDashboard}
                size={24}
                h="5"
                w="5"
                className=" text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
        )
    },
    {
        label: 'Trends',
        href: '/trends',
        icon: (
            <Icon
                path={mdiTrendingUp}
                size={24}
                h="5"
                w="5"
                className=" text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
        )
    },
    { label: '#', href: '#', divider: true },
    {
        label: 'Settings',
        href: '#',
        icon: (
            <Icon
                path={mdiCogs}
                size={24}
                h="5"
                w="5"
                className=" text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
        ),
        submenu: [
            { label: 'Settings 1', href: '/settings-1', icon: <Icon path={mdiCogs} /> },
            { label: 'Settings 2', href: '#', icon: <Icon path={mdiCogs} /> },
            { label: 'Settings 3', href: '#', icon: <Icon path={mdiCogs} /> }
        ]
    }
]

export default sideMenuItems
