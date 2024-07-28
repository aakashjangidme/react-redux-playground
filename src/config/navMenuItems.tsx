import { mdiAccountTieHat, mdiCog, mdiLogout } from '@mdi/js'
import type { NavMenuItem } from '@/components/Navbar/interfaces'
import Icon from '@/components/Icon'

const navMenuItems: NavMenuItem[] = [
    { label: 'Home', href: '/' },
    {
        label: 'Services',
        href: '/services',
        menu: [
            { label: 'Consulting', href: '/services/consulting' },
            { label: 'Development', href: '/services/development' },
            { label: 'Design', href: '/services/design' }
        ]
    },
    {
        label: 'About Us',
        href: '/about',
        menu: [
            { label: 'Company', href: '/about/company' },
            { label: 'Team', href: '/about/team' }
        ]
    },
    { label: 'Contact', href: '/contact' },
    {
        label: 'user',
        href: '#',
        menu: [
            { label: 'Profile', leading: <Icon path={mdiAccountTieHat} className="text-sm" />, href: '/profile' },
            { label: 'Settings', leading: <Icon path={mdiCog} className="text-sm" />, href: '/settings' },
            { divider: true, label: '#', href: '#' },
            { leading: <Icon path={mdiLogout} className="text-sm" />, label: 'Logout', href: '/logout' }
        ]
    }
]

export default navMenuItems
