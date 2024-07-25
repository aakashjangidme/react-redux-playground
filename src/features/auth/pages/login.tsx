import { useAuth } from '../useAuth'
import { LoginForm } from '../components/LoginForm'

const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth()

  const handleSubmit = (data: { email: string; password: string }) => {
    login(data.email, data.password)
  }

  return <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
}

export default LoginPage
