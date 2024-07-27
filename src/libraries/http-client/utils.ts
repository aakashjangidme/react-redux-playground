import type { AxiosResponse, HttpResponseData } from 'axios'
import { AxiosError } from 'axios'

/**
 * Custom error class for HTTP errors.
 * Extends the standard Error class to include HTTP-specific properties.
 */
class HttpError extends Error {
    /**
     * Creates an instance of HttpError.
     * @param {string} [message] - Error message.
     * @param {any} [data] - Additional data associated with the error.
     */
    constructor(message?: string, data?: any) {
        super(message)
        this.name = 'HttpError'
        Object.setPrototypeOf(this, new.target.prototype) // Restore prototype chain
    }
}

/**
 * Type definition for various HTTP error types.
 * Includes standard JavaScript errors, Axios errors, or unknown types.
 */
type HttpErrorType = Error | AxiosError | unknown

/**
 * Handles errors by mapping them to a standardized format.
 * Provides meaningful error messages based on the type of error.
 *
 * @param {HttpErrorType} error - The error to handle. Can be an instance of Error, AxiosError, or a plain object.
 * @returns {CustomSerializedError} - A serialized error object with standardized format.
 */
const handleHttpError = (error: HttpErrorType): CustomSerializedError => {
    const customError: CustomSerializedError = {
        name: 'AppError',
        message: 'An unknown error occurred'
    }

    // Handle AxiosError with a response
    if (error instanceof AxiosError && error.response) {
        customError.message = (error.response.data as HttpResponseData)?.message || error.message
        return customError
    }

    // Handle HttpError or generic Error
    if (error instanceof HttpError || error instanceof Error) {
        customError.message = error.message
        return customError
    }

    // Handle plain objects with message or errorMessage properties
    if (error && typeof error === 'object') {
        if ('message' in error) {
            customError.message = String((error as any).message)
            return customError
        }
        if ('errorMessage' in error) {
            customError.message = String((error as any).errorMessage)
            return customError
        }
    }

    // Handle errors that are plain strings
    if (typeof error === 'string') {
        customError.message = error
        return customError
    }

    return customError
}

/**
 * Extracts the relevant data from an Axios response.
 * This function assumes that the response data contains a 'data' field.
 *
 * @param {AxiosResponse} response - The Axios response object.
 * @returns {T} - The data extracted from the response.
 */
const parseResponse = <T>(response: AxiosResponse): T => {
    return response.data.data
}

export { HttpError, handleHttpError, parseResponse }
