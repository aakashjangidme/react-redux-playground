/**
 * Interface for custom serialized errors.
 * Provides additional fields to standardize error information.
 */
interface CustomSerializedError {
    /** The name of the error */
    name?: string
    /** A descriptive message for the error */
    message?: string
    /** A stack trace for debugging */
    stack?: string
    /** An optional error code */
    code?: string
}

type FetchStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected'

interface FetchDataParams {
    endpoint: string
    params?: Record<string, any>
}

interface GenericState<T> {
    data: T | null
    status: FetchStatus
    error: string | null
}
