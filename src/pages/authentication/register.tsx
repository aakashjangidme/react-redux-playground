import { useAuth } from "../../features/auth/useAuth"
import { RegisterForm } from "./auth-forms/RegisterForm"

const RegisterPage: React.FC = () => {
  const { register, loading, error } = useAuth()

  const handleSubmit = (data: { email: string; password: string }) => {
    register(data.email, data.password)
  }

  return (
    <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />
  )
}
export default RegisterPage
