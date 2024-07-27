import { createAsyncThunk } from '@reduxjs/toolkit'
// import httpClient from "../../libraries/http-client"
import { login, logout, register, setCurrentUser } from 'src/services/authService'

export const userLogin = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
    const response = await login(credentials.email, credentials.password)
    await setCurrentUser(response)
    return response
})

export const userRegister = createAsyncThunk('auth/register', async (credentials: { email: string; password: string }) => {
    const response = await register(credentials.email, credentials.password)
    await setCurrentUser(response)
    return response
})

export const userLogout = createAsyncThunk('auth/logout', async () => {
    const response = await logout()
    await setCurrentUser(null)

    return response
})

// export const login = async (data: AuthData) => {
//   const response = await httpClient.post("/api/auth/login", data)
//   return response.data
// }

// export const register = async (data: AuthData) => {
//   const response = await httpClient.post("/api/auth/register", data)
//   return response.data
// }
