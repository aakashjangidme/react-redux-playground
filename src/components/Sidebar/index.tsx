import type React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export interface SideMenuItem {
    label: string
    href: string
    icon?: JSX.Element
    submenu?: SideMenuItem[]
    divider?: boolean
}

interface SidebarProps {
    menuItems: SideMenuItem[]
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})

    const handleSubmenuToggle = (label: string) => {
        setOpenSubmenus((prevState) => ({
            ...prevState,
            [label]: !prevState[label]
        }))
    }

    const renderMenuItem = (item: SideMenuItem, index: number) => {
        if (item.divider) {
            return <hr key={index} className="border-gray-200 dark:border-gray-700 my-2" />
        }

        if (item.submenu && item.submenu.length > 0) {
            return (
                <li key={index}>
                    <button
                        className="flex items-center p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => handleSubmenuToggle(item.label)}
                    >
                        {item.icon}
                        <span className="ms-3">{item.label}</span>
                        <svg
                            className={`w-4 h-4 ms-auto transition-transform ${openSubmenus[item.label] ? 'rotate-180' : ''}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.92l3.71-3.69a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0l-4.24-4.24a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    {openSubmenus[item.label] && (
                        <ul className="pl-4 mt-1 space-y-1">
                            {item.submenu.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                    <Link
                                        to={subItem.href}
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    >
                                        {subItem.icon}
                                        <span className="ms-3">{subItem.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            )
        }

        return (
            <li key={index}>
                <Link to={item.href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                </Link>
            </li>
        )
    }

    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">{menuItems.map((item, index) => renderMenuItem(item, index))}</ul>
            </div>
        </aside>
    )
}

export default Sidebar
