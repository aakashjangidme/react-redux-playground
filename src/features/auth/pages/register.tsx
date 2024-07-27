import { useAuth } from '../useAuth'
import { RegisterForm } from '../components/RegisterForm'

const RegisterPage: React.FC = () => {
    const { registerUser, status, error } = useAuth()

    const handleSubmit = (credentials: AuthRegisterProps) => {
        registerUser(credentials)
    }

    return <RegisterForm onSubmit={handleSubmit} loading={status === 'pending'} error={error} />
}
export default RegisterPage
