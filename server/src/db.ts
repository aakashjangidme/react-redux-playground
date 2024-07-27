import jwt from 'jsonwebtoken'

// Dummy user store
const users = new Map<string, { password: string; refreshToken?: string }>()

// Initialize with some dummy users
users.set('admin@playgroundx.com', { password: 'password' })

// Function to generate JWT
export function generateToken(username: string, secret: string, expiresIn: string) {
    return jwt.sign({ username }, secret, { expiresIn })
}

// Function to verify JWT
export function verifyToken(token: string, secret: string) {
    return jwt.verify(token, secret)
}

export { users }
