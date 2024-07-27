export interface HttpResponseData<T = any> {
    /** Optional error code */
    code?: string
    /** Optional message with error details */
    message?: string
    /** HTTP status code */
    status: number
    /** Response data */
    data?: T
}
