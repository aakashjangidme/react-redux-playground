import type { ReactNode } from 'react'

import UserAvatar from './index'

type UserAvatarCurrentUserProps = {
    className?: string
    children?: ReactNode
}

export default function UserAvatarCurrentUser({ className = '', children }: UserAvatarCurrentUserProps) {
    //   const userEmail = useAppSelector((state) => state.main.userEmail) //TODO::
    const userEmail = 'aakash.jangid@gmail.com'

    return (
        <UserAvatar username={userEmail} className={className}>
            {children}
        </UserAvatar>
    )
}
