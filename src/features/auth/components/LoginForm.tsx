/* eslint-disable jsx-a11y/anchor-is-valid */
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import LockOutlinedIcon from '@/assets/icons/LockOutlinedIcon.svg?react'
import TextField from '@/components/TextField'

interface LoginFormProps {
    onSubmit: (data: AuthLoginProps) => void
    loading: boolean
    error: string | null
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        onSubmit({
            username: data.get('email') as string,
            password: data.get('password') as string
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-xs">
                <div className="flex flex-col items-center mt-8">
                    <div className="bg-secondary-main rounded-full p-2 mb-4">
                        <LockOutlinedIcon />
                    </div>
                    <h1 className="text-2xl font-semibold">Sign in</h1>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form className="mt-1 w-full" onSubmit={handleSubmit} noValidate>
                        <TextField id="email" label="Email Address" name="email" type="email" autoComplete="email" autoFocus required />
                        <TextField id="password" label="Password" name="password" type="password" autoComplete="current-password" required />
                        <div className="mb-4 flex items-center">
                            <input className="mr-2 leading-tight" type="checkbox" id="remember" name="remember" />
                            <label className="text-sm" htmlFor="remember">
                                Remember me
                            </label>
                        </div>
                        <Button type="submit" loading={loading}>
                            Sign In
                        </Button>
                        <div className="flex justify-between mt-4">
                            <a className="text-sm text-blue-600 hover:text-blue-800" href="#">
                                Forgot password?
                            </a>
                            <a className="text-sm text-blue-600 hover:text-blue-800" href="/register">
                                Don't have an account? Sign Up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
