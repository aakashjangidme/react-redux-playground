import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleHttpError } from 'src/libraries/http-client/utils'
import logger from 'src/utils/logger'

/**
 * Create a base async thunk for making API calls with common handling for success and error cases.
 *
 * @param typePrefix - The action type prefix used for the thunk actions.
 * @param apiCall - A function that returns a promise of the API response.
 * @param options - Optional configuration for the thunk.
 * @param options.retry - Number of retry attempts on failure.
 * @param options.logError - Whether to log errors or not.
 *
 * @returns An `AsyncThunk` for handling API calls with common error and success handling.
 */
export const createGenericThunk = <T>(
    typePrefix: string,
    apiCall: () => Promise<T>,
    options?: {
        retry?: number
        logError?: boolean
    }
) => {
    const { retry = 0, logError = true } = options || {}

    return createAsyncThunk<T, void, { rejectValue: CustomSerializedError }>(typePrefix, async (_, { rejectWithValue }) => {
        let attempt = 0
        while (attempt <= retry) {
            try {
                const response = await apiCall()
                return response
            } catch (error) {
                // Handle errors
                if (attempt === retry) {
                    // Log the error if logError is true
                    if (logError) {
                        const serializedError = handleHttpError(error)
                        logger.error(`${typePrefix}::serializedError`, serializedError)
                    }
                    // Return the custom serialized error
                    return rejectWithValue(handleHttpError(error))
                }
                // Increment attempt count
                attempt++
            }
        }
        // This point should be unreachable
        return rejectWithValue({
            name: 'UnexpectedError',
            message: 'An unexpected error occurred',
            code: 'unexpected_error'
        })
    })
}
