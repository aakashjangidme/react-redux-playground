import LocalStorageService from '@/libraries/LocalStorage'
import logger from '@/utils/logger'
import { createGenericSlice } from '../createGenericSlice'

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark'
}

export interface ThemeState {
    mode: ThemeMode
}

const defaultThemeMode = LocalStorageService.get<ThemeMode>('themeMode') ? LocalStorageService.get<ThemeMode>('themeMode') : ThemeMode.Light

logger.log('defaultThemeMode', defaultThemeMode)

const initialState: ThemeState = {
    mode: defaultThemeMode ?? ThemeMode.Light
}

export const themeSlice = createGenericSlice({
    sliceName: 'theme',
    defaultState: initialState.mode,
    reducers: {
        setDarkMode: (state, action) => {
            console.log(action.payload)
            if (action.payload === null) {
                // Toggle logic
                state.data = state.data === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light
            } else {
                // Set explicitly
                state.data = action.payload ? ThemeMode.Dark : ThemeMode.Light
            }

            if (typeof document !== 'undefined') {
                document.body.classList[state.data === ThemeMode.Dark ? 'add' : 'remove']('dark-scrollbars')
                document.documentElement.classList[state.data === ThemeMode.Dark ? 'add' : 'remove']('dark', 'dark-scrollbars-compat')
            }

            LocalStorageService.set<ThemeMode>('themeMode', state.data)
        }
    }
})

// Action creators are generated for each case reducer function
export const { setDarkMode } = themeSlice.actions

export default themeSlice.reducer
