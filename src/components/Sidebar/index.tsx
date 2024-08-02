import { useMemo, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import iconMapping from '../IconMapping'
import SidebarMenuGroup from './SidebarMenuGroup'
import type { MenuItem } from './types'
import sidebarMenu from './menuItems'
import { DrawerButton, DropdownIndicator, SidebarDropdownItem, SidebarNavDropdownList, SidebarNavLink, SidebarNavList, SidebarSectionTitle } from './components'

import useUpdateEffect from '@/hooks/useUpdateEffect'

interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (arg: boolean) => void
}

// Sidebar component
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const location = useLocation()
    const { pathname } = location

    const triggerRef = useRef<HTMLButtonElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)

    const [isExpanded, setIsExpanded] = useState(() => {
        const storedValue = localStorage.getItem('sidebar-expanded')
        return storedValue === 'true'
    })

    // Close sidebar when clicking outside
    useUpdateEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!sidebarRef.current || !triggerRef.current) return
            if (!sidebarOpen || sidebarRef.current.contains(event.target as Node) || triggerRef.current.contains(event.target as Node)) return
            setSidebarOpen(false)
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [sidebarOpen, setSidebarOpen])

    // Close sidebar on ESC key press
    useUpdateEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (sidebarOpen && event.key === 'Escape') {
                setSidebarOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [sidebarOpen, setSidebarOpen])

    // Update sidebar state in localStorage and body class
    useUpdateEffect(() => {
        localStorage.setItem('sidebar-expanded', isExpanded.toString())
        document.body.classList.toggle('sidebar-expanded', isExpanded)
    }, [isExpanded])

    // Render menu items with useMemo
    const renderMenuItems = useMemo(
        () => (items: MenuItem[]) => {
            return items.map((section) => {
                const IconComponent = section.icon && iconMapping[section.icon]
                return (
                    <div key={section.title}>
                        {section.children && section.children.length > 0 ? (
                            <SidebarMenuGroup isActive={pathname === section.path || pathname.includes(section.path)}>
                                {(handleClick, isOpen) => (
                                    <>
                                        {/* dropdown parent */}
                                        <NavLink
                                            to={section.path}
                                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === section.path || pathname.includes(section.path) ? 'bg-graydark dark:bg-meta-4' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                isExpanded ? handleClick() : setIsExpanded(true)
                                            }}
                                        >
                                            {IconComponent && <IconComponent />}
                                            {section.title}
                                            <DropdownIndicator isOpen={isOpen} />
                                        </NavLink>

                                        {/* dropdown children */}
                                        <SidebarNavDropdownList open={isOpen}>
                                            {section.children?.map((child) => (
                                                <SidebarDropdownItem key={child.title} to={child.path}>
                                                    {child.title}
                                                </SidebarDropdownItem>
                                            ))}
                                        </SidebarNavDropdownList>
                                    </>
                                )}
                            </SidebarMenuGroup>
                        ) : (
                            <SidebarNavLink to={section.path} currentPath={pathname}>
                                {IconComponent && <IconComponent />}
                                {section.title}
                            </SidebarNavLink>
                        )}
                    </div>
                )
            })
        },
        [pathname, isExpanded]
    )
    return (
        <aside
            ref={sidebarRef}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* sidebar logo/header */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/">
                    {/* <img src={Logo} alt="Logo" /> */}
                    <span className="text-xl font-semibold text-bodydark1">DashboardX</span>
                </NavLink>
                <DrawerButton triggerRef={triggerRef} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>

            {/* sidebar menu container */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    {Object.entries(sidebarMenu).map(([section, items]) => (
                        <div key={section}>
                            <SidebarSectionTitle>{section}</SidebarSectionTitle>
                            <SidebarNavList>{renderMenuItems(items)}</SidebarNavList>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
