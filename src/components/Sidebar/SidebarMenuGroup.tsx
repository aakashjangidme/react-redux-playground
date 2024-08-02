import type { ReactNode } from 'react'
import { useState } from 'react'

interface SidebarLinkGroupProps {
    children: (handleClick: () => void, open: boolean) => ReactNode
    isActive: boolean
}

const SidebarMenuGroup = ({ children, isActive }: SidebarLinkGroupProps) => {
    const [open, setOpen] = useState<boolean>(isActive)

    const handleClick = () => {
        setOpen(!open)
    }

    return <li>{children(handleClick, open)}</li>
}

export default SidebarMenuGroup
