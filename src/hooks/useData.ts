// useData.ts
import { useMemo, useRef, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store/store'
import useUpdateEffect from '@/hooks/useUpdateEffect'
import logger from '@/lib/utils/logger'

// Define properties for the useData hook
interface UseDataProps<T> {
    /**
     * Selector function to get the data from the Redux store.
     * @param state - The Redux store state.
     * @returns The data to be used by the component.
     */
    selectData: (state: RootState) => T

    /**
     * Selector function to get the status from the Redux store.
     * @param state - The Redux store state.
     * @returns The current fetch status.
     */
    selectStatus: (state: RootState) => FetchStatus

    /**
     * Selector function to get the error message from the Redux store.
     * @param state - The Redux store state.
     * @returns The current error message, if any.
     */
    selectError: (state: RootState) => string | null

    /**
     * Async thunk action creator to fetch data.
     * @param signal - Optional AbortSignal to handle request cancellation.
     * @returns An async thunk action.
     */
    fetchAction: (payload?: any, signalX?: AbortSignal) => any
}

/**
 * A custom hook to fetch and manage data from the Redux store.
 * Handles fetching data, managing loading and error states, and canceling requests.
 *
 * @param props - An object containing the selectors and async action.
 * @returns An object containing the data, status, error, loading state, and cancel function.
 */
export const useData = <T>({ selectData, selectStatus, selectError, fetchAction }: UseDataProps<T>) => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectData)
    const status = useAppSelector(selectStatus)
    const error = useAppSelector(selectError)

    // Reference to manage the AbortController
    const controllerRef = useRef<AbortController | null>(null)

    // Calculate loading state based on status
    const loading = useMemo(() => status === 'idle' || status === 'pending', [status])

    /**
     * Function to fetch data with AbortController to handle request cancellation.
     * The AbortController signal is passed to the fetchAction to enable cancellation.
     */
    const fetchDataWithAbort = useCallback(async () => {
        controllerRef.current = new AbortController()
        logger.debug('Fetching data with AbortController')
        // Dispatch the fetch action with the abort controller
        await dispatch(fetchAction(undefined, controllerRef.current.signal))
    }, [dispatch, fetchAction])

    /**
     * Function to cancel the ongoing request.
     * This aborts the request if it is still in progress.
     */
    const cancelRequest = useCallback(() => {
        if (controllerRef.current) {
            console.log('Cancelling request')
            controllerRef.current.abort()
        }
    }, [])

    useUpdateEffect(() => {
        // Fetch data on component mount or when dependencies change
        fetchDataWithAbort()

        // Cleanup function to cancel request on unmount or dependency change
        return () => {
            cancelRequest()
        }
    }, [fetchDataWithAbort, cancelRequest])

    return { data, status, error, loading, cancelRequest, refetch: fetchDataWithAbort }
}
