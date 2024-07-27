import express from 'express'
import { users, generateToken, verifyToken } from './db'
import { sendErrorResponse, sendSuccessResponse } from './utils/responseHandler'

const router = express.Router()

const SECRET_KEY = 'SECRET_KEY'
const REFRESH_SECRET_KEY = 'REFRESH_SECRET_KEY'

// healthCheck route
router.get('/health', (req, res) => {
    sendSuccessResponse(res, null, 'Health Up!')
})

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body

    console.log({ username, password })

    if (!username || !password) {
        return sendErrorResponse(res, 400, 'Email and password are required', 'REQUIRED_CREDENTIALS')
    }

    const user = users.get(username)
    if (!user || user.password !== password) {
        return sendErrorResponse(res, 401, 'Invalid credentials', 'INVALID_CREDENTIALS')
    }

    const accessToken = generateToken(username, SECRET_KEY, '1h')
    const refreshToken = generateToken(username, REFRESH_SECRET_KEY, '7d')

    // Store refresh token in user record
    user.refreshToken = refreshToken

    sendSuccessResponse(res, { accessToken, refreshToken }, 'Login successful')
})

// Refresh token route
router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        return sendErrorResponse(res, 400, 'Refresh token is required')
    }

    try {
        const decoded = verifyToken(refreshToken, REFRESH_SECRET_KEY) as any
        const user = users.get(decoded.username)

        if (!user || user.refreshToken !== refreshToken) {
            return sendErrorResponse(res, 401, 'Invalid refresh token')
        }

        const newAccessToken = generateToken(decoded.username, SECRET_KEY, '1h')
        const newRefreshToken = generateToken(decoded.username, REFRESH_SECRET_KEY, '7d')

        // Update refresh token in user record
        user.refreshToken = newRefreshToken

        sendSuccessResponse(res, { accessToken: newAccessToken, refreshToken: newRefreshToken }, 'Token refreshed successfully')
    } catch (err) {
        sendErrorResponse(res, 401, 'Invalid refresh token')
    }
})

// Logout route
router.post('/logout', (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        return sendErrorResponse(res, 400, 'Refresh token is required')
    }

    try {
        const decoded = verifyToken(refreshToken, REFRESH_SECRET_KEY) as any
        const user = users.get(decoded.username)

        if (user) {
            user.refreshToken = undefined
        }

        sendSuccessResponse(res, {}, 'Logged out successfully')
    } catch (err) {
        sendErrorResponse(res, 401, 'Invalid refresh token')
    }
})

// Register route
router.post('/register', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return sendErrorResponse(res, 400, 'Email and password are required')
    }

    if (users.has(username)) {
        return sendErrorResponse(res, 400, 'User already exists')
    }

    // Store new user
    users.set(username, { password })

    // Generate tokens (initially with no refresh token)
    const accessToken = generateToken(username, SECRET_KEY, '1h')
    const refreshToken = generateToken(username, REFRESH_SECRET_KEY, '7d')

    // Store refresh token in user record
    users.set(username, { password, refreshToken })

    sendSuccessResponse(res, { accessToken, refreshToken }, 'User registered successfully')
})

export { router as authRoutes }
