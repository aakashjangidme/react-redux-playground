import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../useAuth'

import { LoginForm } from '../components/LoginForm'
import useUpdateEffect from '@/hooks/useUpdateEffect'

const LoginPage: React.FC = () => {
    const { loginUser, status, error, isAuthenticated } = useAuth()

    const navigate = useNavigate()

    const { state } = useLocation()

    const handleSubmit = (data: AuthLoginProps) => {
        loginUser(data)
    }

    useUpdateEffect(() => {
        console.log({ isAuthenticated, state })
        if (isAuthenticated) {
            if (state?.from) {
                navigate(state?.from)
            } else {
                navigate('/')
            }
        }
    }, [isAuthenticated, navigate, state])

    return <LoginForm onSubmit={handleSubmit} loading={status === 'pending'} error={error} />
}

export default LoginPage
