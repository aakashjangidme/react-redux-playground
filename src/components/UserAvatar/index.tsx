import type { ReactNode } from 'react'

type UserAvatarProps = {
    username: string
    api?: string
    className?: string
    children?: ReactNode
}

export default function UserAvatar({ username, api = 'avataaars', className = '', children }: UserAvatarProps) {
    const avatarImage = `https://api.dicebear.com/7.x/${api}/svg?seed=${username.replace(/[^a-z0-9]+/gi, '-')}`

    return (
        <div className={className}>
            <img src={avatarImage} alt={username} className="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800" />
            {children}
        </div>
    )
}
