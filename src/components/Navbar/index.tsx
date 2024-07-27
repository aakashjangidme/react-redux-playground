import React from 'react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import Icon from '../Icon'
import type { NavBranding, NavMenuItem, NavLabel, NavUser } from './interfaces'
import { useAuth } from 'src/features/auth/useAuth'

interface NavbarProps {
    branding: NavBranding
    menuItems: NavMenuItem[]
    children?: ReactNode
}

const Navbar: React.FC<NavbarProps> = ({ branding, menuItems }) => {
    const { pathname } = useLocation()
    const [openDropdown, setOpenDropdown] = useState<NavLabel>(null)
    const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false)

    const { logoutUser } = useAuth()

    // const user = useAppSelector((state: RootState) => state.user) //#TODO:

    const user: NavUser = { avatar: '', email: 'ajangid25@gmail.com', name: 'Aakash J' }

    const handleDropdownToggle = (label: NavLabel) => {
        if (openDropdown === label) {
            setOpenDropdown(null)
        } else {
            setOpenDropdown(label)
        }
    }

    const handleUserDropdownToggle = () => {
        setUserDropdownOpen((prev) => !prev)
    }

    const handleLogout = () => {
        logoutUser()
    }

    const renderMenuItem = (item: NavMenuItem, isSubItem: boolean = false) => {
        const activeClassName = 'block py-2 px-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
        const defaultClassName =
            'block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'

        if (item.label === 'user' && user) {
            return (
                <li className="relative" key={item.href}>
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded={userDropdownOpen ? 'true' : 'false'}
                        onClick={handleUserDropdownToggle}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={user.avatar} alt={user.name} />
                    </button>
                    {userDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg dark:bg-gray-800">
                            <div className="px-4 py-3">
                                <p className="text-sm text-gray-900 dark:text-white">{user.name}</p>
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">{user.email}</p>
                            </div>
                            <ul className="py-1">
                                {item.menu?.map((subItem, index) => (
                                    <React.Fragment key={index}>
                                        {subItem.divider ? (
                                            <hr className="border-gray-200 dark:border-gray-700 my-2" />
                                        ) : (
                                            <li>
                                                <Link
                                                    to={subItem.href}
                                                    onClick={() => (subItem.href === '/logout' ? handleLogout() : null)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                                >
                                                    {subItem.leading && <span className="mr-2">{subItem.leading}</span>}
                                                    {subItem.label}
                                                    {subItem.trailing && <span className="ml-2">{subItem.trailing}</span>}
                                                </Link>
                                            </li>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            )
        }

        if (item.menu && item.menu.length > 0) {
            return (
                <div className="relative group" key={item.href}>
                    <button
                        className={`${pathname === item.href ? activeClassName : defaultClassName} flex items-center`}
                        onClick={() => handleDropdownToggle(item.label)}
                    >
                        {item.leading && <span className="mr-2">{item.leading}</span>}
                        {item.label}
                        <Icon path={openDropdown === item.label ? mdiChevronUp : mdiChevronDown} className="ml-1 -mr-2" />
                        {item.trailing && <span className="ml-2">{item.trailing}</span>}
                    </button>
                    {openDropdown === item.label && (
                        <div className="absolute mt-2 bg-white border border-gray-200 shadow-lg dark:bg-gray-800">
                            {item.menu.map((subItem, index) => (
                                <Link
                                    key={index}
                                    to={subItem.href}
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    {subItem.leading && <span className="mr-2">{subItem.leading}</span>}
                                    {subItem.label}
                                    {subItem.trailing && <span className="ml-2">{subItem.trailing}</span>}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )
        }

        return (
            <Link key={item.href} to={item.href} className={pathname === item.href ? activeClassName : defaultClassName}>
                {item.leading && <span className="mr-2">{item.leading}</span>}
                {item.label}
                {item.trailing && <span className="ml-2">{item.trailing}</span>}
            </Link>
        )
    }

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            data-drawer-target="logo-sidebar"
                            data-drawer-toggle="logo-sidebar"
                            aria-controls="logo-sidebar"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                        <Link to="/" className="flex ms-2 md:me-24">
                            {branding.logo && <img src={branding.logo} className="h-8 me-3" alt={branding.title} />}
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">{branding.title}</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                {menuItems.map((menu) => renderMenuItem(menu))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
