import { Outlet } from 'react-router-dom'

import { useLocation } from 'react-router-dom'

import { useState } from 'react'
import React from 'react'
import Sidebar from '@/components/Sidebar'

import Header from '@/components/Header'
import useUpdateEffect from '@/hooks/useUpdateEffect'

const MemoizedSidebar = React.memo(Sidebar)
const MemoizedHeader = React.memo(Header)

const DashboardLayout = () => {
    const { pathname } = useLocation()

    useUpdateEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className=" dark:bg-boxdark-2 dark:text-bodydark">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <MemoizedSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    <MemoizedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            <Outlet />
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>

            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    )
}

export default DashboardLayout
