interface AuthState {
    accessToken: string | null
    refreshToken: string | null
}

interface User {
    id: string
    username: string
}

interface AuthProps {}

interface AuthLoginProps extends AuthProps {
    username: string
    password: string
}
interface AuthRegisterProps extends AuthProps {
    email: string
    username: string
    password: string
}
