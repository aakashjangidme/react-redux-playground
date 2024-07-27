interface AuthState {
    isAuthenticated: boolean
    loading: boolean
    error: string | null
}

interface AuthData {
    email: string
    password: string
}

interface User {
    id: string
    email: string
}
