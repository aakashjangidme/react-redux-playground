import Icon from '.'

type RoundedIconProps = {
    icon: string
    color?: any
    w?: string
    h?: string
    bg?: boolean
    className?: string
}

export default function IconRounded({ icon, color, w = 'w-12', h = 'h-12', bg = false, className = '' }: RoundedIconProps) {
    return <Icon path={icon} w={w} h={h} size="24" className={`rounded-full bg-gray-50 dark:bg-slate-800 ${className}`} />
}
