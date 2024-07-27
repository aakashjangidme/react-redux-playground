import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import type { RootState } from 'src/store/store'
import { userLogin, userRegister } from './authAPI'

export const useAuth = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector((state: RootState) => state.auth)
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)

    const login = async (email: string, password: string) => {
        try {
            await dispatch(userLogin({ email, password }))
            // Handle success, e.g., redirect to dashboard
            if (state?.from) {
                navigate(state?.from)
            } else {
                navigate('/')
            }
        } catch (error) {
            // Handle error, e.g., show error message
        }
    }

    const register = async (email: string, password: string) => {
        try {
            await dispatch(userRegister({ email, password }))
            // Handle success, e.g., redirect to dashboard
        } catch (error) {
            // Handle error, e.g., show error message
        }
    }

    return { login, register, loading, error, isAuthenticated }
}
