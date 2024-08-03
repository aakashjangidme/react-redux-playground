import type { AxiosError, AxiosResponse, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, HttpResponseData } from 'axios'
import axios from 'axios'
import { toCamelCase, toSnakeCase } from './transformCase'
import { handleHttpError, HttpError } from './utils'
import TokenService from '@/services/tokenService'
import logger from '@/lib/utils/logger'

// Axios instance configuration
const httpClient: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

/**
 * Refresh token on authentication failure
 * @param {AxiosError} error - Axios error
 * @returns {Promise<AxiosResponse>} - Promise with the retried request or error
 */
const refreshTokenOnFailure = async (error: AxiosError): Promise<AxiosResponse> => {
    const originalRequest = error.config as AxiosRequestConfig
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = TokenService.getRefreshToken()
        try {
            const response = await httpClient.post('/api/auth/refresh-token', { token: refreshToken })
            const { accessToken } = response.data
            TokenService.setAccessToken(accessToken)
            // Set Authorization header only for this instance
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            return httpClient(originalRequest)
        } catch (err) {
            TokenService.setAccessToken(null)
            TokenService.setRefreshToken(null)
            logger.error('Token refresh failed', err)
            return Promise.reject(err)
        }
    }
    return Promise.reject(error)
}

/**
 * Handle request success
 * @param {InternalAxiosRequestConfig} request - Axios request configuration
 * @returns {InternalAxiosRequestConfig} - Modified request configuration
 */
const handleRequestSuccess = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (request.data) {
        request.data = toSnakeCase(request.data)
    }

    request.headers['X-APP-ID'] = 'PlaygroundX'

    const accessToken = TokenService.getAccessToken()
    if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return request
}

/**
 * Handle request error
 * @param {AxiosError} error - Axios error
 * @returns {Promise<never>} - Promise rejection with error
 */
const handleRequestError = (error: AxiosError): Promise<never> => {
    return Promise.reject(handleHttpError(error))
}

/**
 * Handle response success
 * @param {AxiosResponse} response - Axios response
 * @returns {any} - Transformed response data
 */
const handleResponseSuccess = (response: AxiosResponse): any => {
    const responseData = response.data

    if (response.status >= 200 && response.status < 300) {
        return toCamelCase(responseData.data ?? responseData)
    } else {
        throw new HttpError(responseData?.message ?? `Server responded with status ${response.status}`)
    }
}

/**
 * Handle response error
 * @param {AxiosError} error - Axios error
 * @returns {Promise<HttpResponseData>} - Promise rejection with error response
 */
const handleResponseError = async (error: AxiosError): Promise<never> => {
    try {
        await refreshTokenOnFailure(error)
    } catch (refreshError) {
        logger.error('Error during token refresh', refreshError)
        // If refreshing the token fails, reject with the original error
        // TODO: Implement re-login or redirect logic here
        return Promise.reject(refreshError)
    }

    const responseData = error.response?.data as HttpResponseData
    return Promise.reject({
        code: responseData?.code || 'SERVER_ERROR',
        message: responseData?.message || 'Server did not respond with any error message.',
        status: responseData?.status || 500
    })
}

// Adding request interceptors
httpClient.interceptors.request.use(handleRequestSuccess, handleRequestError)

// Adding response interceptors
httpClient.interceptors.response.use(handleResponseSuccess, handleResponseError)

export default httpClient
