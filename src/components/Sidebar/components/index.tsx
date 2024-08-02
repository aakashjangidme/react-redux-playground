import { NavLink } from 'react-router-dom'

// Sidebar Section Title
export const SidebarSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">{children}</h3>
)

// Sidebar Navigation List
export const SidebarNavList = ({ children }: { children: React.ReactNode }) => <ul className="mb-6 flex flex-col gap-1.5">{children}</ul>
// Sidebar Navigation Dropdown List
export const SidebarNavDropdownList = ({ open, children }: { open: boolean; children: React.ReactNode }) => (
    <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">{children}</ul>
    </div>
)

interface SidebarNavLinkProps {
    to: string
    currentPath: string
    children: React.ReactNode
}
// / Sidebar Navigation Link
export const SidebarNavLink = ({ to, currentPath, children }: SidebarNavLinkProps) => (
    <li>
        <NavLink
            to={to}
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                currentPath.includes(to) ? 'bg-graydark dark:bg-meta-4' : ''
            }`}
        >
            {children}
        </NavLink>
    </li>
)

interface SidebarDropdownItemProps {
    to: string
    children: React.ReactNode
}

// Sidebar Dropdown Item
export const SidebarDropdownItem = ({ to, children }: SidebarDropdownItemProps) => (
    <li>
        <NavLink
            to={to}
            className={({ isActive }) =>
                `group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                    isActive ? '!text-white' : ''
                }`
            }
        >
            {children}
        </NavLink>
    </li>
)

interface DrawerButtonProps {
    triggerRef: React.RefObject<HTMLButtonElement>
    sidebarOpen: boolean
    setSidebarOpen: (arg: boolean) => void
}

export const DrawerButton = ({ triggerRef, sidebarOpen, setSidebarOpen }: DrawerButtonProps) => (
    <button ref={triggerRef} onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" aria-expanded={sidebarOpen} className="block lg:hidden">
        <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" />
        </svg>
    </button>
)

// Dropdown indicator for menu items
export const DropdownIndicator = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${isOpen ? 'rotate-180' : ''}`}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
        />
    </svg>
)
