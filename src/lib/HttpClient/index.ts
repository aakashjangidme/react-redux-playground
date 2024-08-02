import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosError, AxiosResponse, AxiosInstance, HttpResponseData } from 'axios'
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

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders
    _retry?: boolean
}

/**
 * Refresh token on authentication failure
 * @param {AxiosError} error - Axios error
 * @returns {Promise<AxiosResponse>} - Promise with the retried request or error
 */
const refreshTokenOnFailure = async (error: AxiosError): Promise<AxiosResponse> => {
    const originalRequest = error.config as CustomAxiosRequestConfig
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
            return Promise.reject(err)
        }
    }
    return Promise.reject(error)
}

/**
 * Handle request success
 * @param {CustomAxiosRequestConfig} config - Axios request configuration
 * @returns {CustomAxiosRequestConfig} - Modified request configuration
 */
const handleRequestSuccess = (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    if (config.data) {
        config.data = toSnakeCase(config.data)
    }

    const accessToken = TokenService.getAccessToken()
    if (accessToken) {
        // Set Authorization header only for this instance
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
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
const handleResponseSuccess = (response: AxiosResponse) => {
    const responseData = response.data

    if (response.status >= 200 && response.status < 300) {
        return toCamelCase(responseData.data ?? responseData)
    } else {
        throw new HttpError(responseData?.message ?? `Something went wrong, server responded with status ${response.status}`)
    }
}

/**
 * Handle response error
 * @param {AxiosError} error - Axios error
 * @returns {Promise<HttpResponseData>} - Promise rejection with error response
 */
const handleResponseError = async (error: AxiosError) => {
    try {
        await refreshTokenOnFailure(error)
    } catch (refreshError) {
        logger.log('handleResponseError', refreshError)
        // If refreshing the token fails, reject with the original error
        // TODO:: re-login at this point
        return Promise.reject(refreshError)
    }

    const responseData = error.response?.data as HttpResponseData
    return Promise.reject({
        code: responseData?.code || 'SERVER_ERROR',
        message: responseData?.message || 'Something went wrong, server did not respond with any error message.',
        status: responseData?.status || 500
    })
}

// Adding request interceptors
httpClient.interceptors.request.use(handleRequestSuccess, handleRequestError)

// Adding response interceptors
httpClient.interceptors.response.use(handleResponseSuccess, handleResponseError)

export default httpClient
