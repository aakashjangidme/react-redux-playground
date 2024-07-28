import { useMemo } from 'react'
import { userLogin, userLogout, userRefreshToken, userRegister } from './authAPI'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store/store'

export const useAuth = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state: RootState) => state.auth.data)
    const status = useAppSelector((state: RootState) => state.auth.status)
    const error = useAppSelector((state: RootState) => state.auth.error)

    const loading = useMemo(() => status === 'idle' || status === 'pending', [status])

    const isAuthenticated = useAppSelector((state: RootState) => state.auth.data?.accessToken !== null)

    const loginUser = (credentials: AuthLoginProps) => dispatch(userLogin(credentials))
    const registerUser = (credentials: AuthRegisterProps) => dispatch(userRegister(credentials))
    const logoutUser = () => dispatch(userLogout())
    const refreshAuthToken = (token: string) => dispatch(userRefreshToken(token))

    // #TODO: how to check if a user is already loggedIn, and redirect them?
    // #TODO: how to listen to the current authentication status?

    return { data, status, error, loading, isAuthenticated, loginUser, logoutUser, registerUser, refreshAuthToken }
}
