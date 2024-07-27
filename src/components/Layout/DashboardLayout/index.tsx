import { Outlet } from 'react-router-dom'

import type { SideMenuItem } from 'src/components/Sidebar'
import Sidebar from 'src/components/Sidebar'
import Navbar from 'src/components/Navbar'
import type { Branding, NavMenuItem } from 'src/components/Navbar/interfaces'

interface DashboardLayoutProps {
    dashboardBranding: Branding
    navMenuItems: NavMenuItem[]
    sideMenuItems: SideMenuItem[]
}

const DashboardLayout = ({ dashboardBranding, navMenuItems, sideMenuItems }: DashboardLayoutProps) => {
    return (
        <div>
            <Navbar menuItems={navMenuItems} branding={{ ...dashboardBranding }} />
            <Sidebar menuItems={sideMenuItems} />
            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
