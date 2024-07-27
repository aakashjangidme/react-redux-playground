/* eslint-disable jsx-a11y/anchor-is-valid */
import Alert from 'src/components/Alert'
import Button from 'src/components/Button'
import TextField from 'src/components/TextField/TextField'

import { LockOutlinedIcon } from 'src/components/Icons/LockOutlinedIcon'

interface RegisterFormProps {
    onSubmit: (data: { email: string; password: string }) => void
    loading: boolean
    error: string | null
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        onSubmit({
            email: data.get('email') as string,
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
                    <h1 className="text-2xl font-semibold">Sign up</h1>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form className="mt-1 w-full" onSubmit={handleSubmit} noValidate>
                        <TextField id="email" label="Email Address" name="email" type="email" autoComplete="email" autoFocus required />
                        <TextField id="password" label="Password" name="password" type="password" autoComplete="current-password" required />
                        <Button type="submit" loading={loading}>
                            Sign Up
                        </Button>
                        <div className="flex justify-between mt-4">
                            <a className="text-sm text-blue-600 hover:text-blue-800" href="/login">
                                Already have an account? Log in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
