import type { ActionReducerMapBuilder, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

// Base state interface
export interface GenericState<T> {
    data: T | null
    status: FetchStatus
    error: string | null
}

// Interface for the properties required to create a generic slice
interface GenericSliceProps<T, R extends SliceCaseReducers<GenericState<T>>> {
    /**
     * The name of the slice.
     */
    sliceName: string

    /**
     * The default state of the data.
     */
    defaultState: T

    /**
     * Reducers for the slice. Optional.
     */
    reducers?: ValidateSliceCaseReducers<GenericState<T>, R>

    /**
     * Extra reducers for the slice. Optional.
     * @param builder - The ActionReducerMapBuilder for the slice.
     */
    extraReducers?: (builder: ActionReducerMapBuilder<GenericState<T>>) => void
}

/**
 * Creates a generic slice with the given properties.
 *
 * @param props - The properties required to create a generic slice.
 * @returns A generic slice with the specified properties.
 */
export function createGenericSlice<T, R extends SliceCaseReducers<GenericState<T>>>(props: GenericSliceProps<T, R>) {
    const { sliceName, reducers, defaultState, extraReducers } = props

    // Initial state for the slice
    const initialState: GenericState<T> = {
        data: defaultState,
        status: 'idle',
        error: null
    }

    // Create and return the slice
    return createSlice({
        name: sliceName,
        initialState,
        reducers: {
            ...reducers,
            /**
             * Resets the state to the initial state.
             * @param state - The current state of the slice.
             */
            reset: (state) => {
                Object.assign(state, initialState)
            }
        },
        extraReducers
    })
}
