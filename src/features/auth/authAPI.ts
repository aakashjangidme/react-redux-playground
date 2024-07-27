import type { LoginResponse, RegisterResponse } from 'src/services/authService'
import AuthService from 'src/services/authService'
import { createGenericThunk } from 'src/store/createGenericThunk'

export const userLogin = createGenericThunk<LoginResponse, AuthLoginProps>('auth/login', AuthService.login, {
    retry: 0,
    logError: true
})

export const userRegister = createGenericThunk<RegisterResponse, AuthRegisterProps>('auth/register', AuthService.register, {
    retry: 0,
    logError: true
})

export const userLogout = createGenericThunk<void, void>('auth/logout', AuthService.logout, {
    retry: 0,
    logError: true
})

export const userRefreshToken = createGenericThunk<LoginResponse, string>('auth/refresh-token', AuthService.refreshToken, {
    retry: 1,
    logError: true
})
