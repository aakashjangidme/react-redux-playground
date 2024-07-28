// useData.ts
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useMemo } from 'react'
import type { RootState } from '@/store/store'
import useUpdateEffect from '@/store/useUpdateEffect'

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
     * @returns An async thunk action.
     */
    fetchAction: () => any
}

/**
 * A custom hook to fetch and manage data from the Redux store.
 *
 * @param props - An object containing the selectors and async action.
 * @returns An object containing the data, status, error, and loading state.
 */
export const useData = <T>({ selectData, selectStatus, selectError, fetchAction }: UseDataProps<T>) => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectData)
    const status = useAppSelector(selectStatus)
    const error = useAppSelector(selectError)

    // Calculate loading state based on status
    const loading = useMemo(() => status === 'idle' || status === 'pending', [status])

    useUpdateEffect(() => {
        // Dispatch the fetch action when the component mounts
        dispatch(fetchAction())
    }, [dispatch, fetchAction])

    return { data, status, error, loading }
}
