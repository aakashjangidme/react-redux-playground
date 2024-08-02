import httpClient from '@/lib/HttpClient'

export interface AuthResponse {
    accessToken: string
    refreshToken: string
}

export interface LoginRequest {
    username: string
    password: string
}

export interface RegisterRequest {
    username: string
    password: string
    email: string
}

export interface LoginResponse extends AuthResponse {}

export interface RegisterResponse extends LoginResponse {}

export const login = (data: LoginRequest): Promise<LoginResponse> => {
    return httpClient.post<LoginResponse>('/api/auth/login', data)
}

const logout = (): Promise<void> => {
    return httpClient.post<void>('/api/auth/logout')
}

export const refreshToken = (token: string): Promise<LoginResponse> => {
    return httpClient.post<LoginResponse>('/api/auth/refresh-token', { token })
}

export const register = (data: RegisterRequest): Promise<RegisterResponse> => {
    return httpClient.post<RegisterResponse>('/api/auth/register', data)
}

const AuthService = { login, register, logout, refreshToken }

export default AuthService
