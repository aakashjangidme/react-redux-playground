import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosError, AxiosResponse, AxiosInstance, HttpResponseData } from 'axios'
import axios from 'axios'
import { toCamelCase, toSnakeCase } from './transformCase'
import { handleHttpError, HttpError } from './utils'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders
    _retry?: boolean
}

/**
 * Request Success Handler
 * @param {CustomAxiosRequestConfig} config - Axios request configuration
 * @returns {CustomAxiosRequestConfig} - Modified request configuration
 */
const handleRequestSuccess = (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    if (config.data) {
        config.data = toSnakeCase(config.data)
    }
    return config
}

/**
 * Request Error Handler
 * @param {AxiosError} error - Axios error
 * @returns {Promise<never>} - Promise rejection with error
 */
const handleRequestError = (error: AxiosError): Promise<never> => {
    return Promise.reject(handleHttpError(error))
}

/**
 * Response Success Handler
 * @param {AxiosResponse} response - Axios response
 * @returns {any} - Response data or error handling
 */
const handleResponseSuccess = (response: AxiosResponse) => {
    const responseData = response.data as HttpResponseData

    if (response.status >= 200 && response.status < 300) {
        return toCamelCase(responseData.data ?? responseData)
    } else {
        throw new HttpError(responseData?.message ?? `Something went wrong, server responded with status ${response.status}`)
    }
}

/**
 * Response Error Handler
 * @param {AxiosError} error - Axios error
 * @returns {Promise<HttpResponseData>} - Promise rejection with default error response
 */
const handleResponseError = (error: AxiosError) => {
    const responseData = error.response?.data as HttpResponseData
    return Promise.reject({
        code: responseData?.code || 'no_code',
        message: responseData?.message || 'Something went wrong, server did not respond with any error message.',
        status: responseData?.status || 500
    })
}

// Axios instance configuration
const httpClient: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

// Adding request interceptors
httpClient.interceptors.request.use(handleRequestSuccess, handleRequestError)

// Adding response interceptors
httpClient.interceptors.response.use(handleResponseSuccess, handleResponseError)

export default httpClient
