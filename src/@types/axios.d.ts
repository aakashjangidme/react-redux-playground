import 'axios'

declare module 'axios' {
    /**
     * Extended Axios request configuration interface.
     * Includes additional properties for custom configurations.
     */
    export interface AxiosRequestConfig {
        /** Optional retry flag */
        _retry?: boolean
        /** Optional cache key*/
        cacheKey?: string
    }

    /**
     * Interface for the HTTP response data.
     * Can be used to standardize the response format across different services.
     */
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

    /**
     * Augmented AxiosInstance interface to include custom method signatures.
     */
    export interface AxiosInstance {
        /**
         * Sends a request to the server.
         *
         * @param {AxiosRequestConfig} config - The Axios request configuration.
         * @returns {Promise<T>} - A promise resolving to the response data.
         */
        request<T = any>(config: AxiosRequestConfig): Promise<T>

        /**
         * Sends a GET request.
         *
         * @param {string} url - The URL to send the request to.
         * @param {AxiosRequestConfig} [config] - Optional request configuration.
         * @returns {Promise<T>} - A promise resolving to the response data.
         */
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>

        /**
         * Sends a DELETE request.
         *
         * @param {string} url - The URL to send the request to.
         * @param {AxiosRequestConfig} [config] - Optional request configuration.
         * @returns {Promise<T>} - A promise resolving to the response data.
         */
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>

        /**
         * Sends a HEAD request.
         *
         * @param {string} url - The URL to send the request to.
         * @param {AxiosRequestConfig} [config] - Optional request configuration.
         * @returns {Promise<T>} - A promise resolving to the response data.
         */
        head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>

        /**
         * Sends a POST request.
         *
         * @param {string} url - The URL to send the request to.
         * @param {any} [data] - Optional request payload.
         * @param {AxiosRequestConfig} [config] - Optional request configuration.
         * @returns {Promise<T>} - A promise resolving to the response data.
         */
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>

        /**
         * Sends a PUT request.
         *
         * @param {string} url - The URL to send the request to.
         * @param {any} [data] - Optional request payload.
         * @param {AxiosRequestConfig} [config] - Optional request configuration.
         * @returns {Promise<T>} - A promise resolving to the response data.
         */
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>

        /**
         * Sends a PATCH request.
         *
         * @param {string} url - The URL to send the request to.
         * @param {any} [data] - Optional request payload.
         * @param {AxiosRequestConfig} [config] - Optional request configuration.
         * @returns {Promise<T>} - A promise resolving to the response data.
         */
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    }
}
