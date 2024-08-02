import DashboardIcon from '@/assets/icons/DashboardIcon.svg?react'
import SettingsIcon from '@/assets/icons/SettingsIcon.svg?react'
import AuthIcon from '@/assets/icons/AuthIcon.svg?react'

interface IconMappingProps {
    [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null
}

const iconMapping: IconMappingProps = {
    DashboardIcon,
    SettingsIcon,
    AuthIcon
}

export default iconMapping
