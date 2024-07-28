import { createGenericSlice } from '../createGenericSlice'
import LocalStorageService from '@/libraries/LocalStorage'
import logger from '@/lib/utils/logger'

export type Theme = 'dark' | 'light' | 'system'

type ThemeState = {
    theme: Theme
}

const storageKey = 'app-ui-theme'

const defaultTheme: Theme = 'system'

const getInitialTheme = (): Theme => {
    return LocalStorageService.get<Theme>(storageKey) || defaultTheme
}

logger.log('getInitialTheme::', getInitialTheme())

const initialState: ThemeState = {
    theme: getInitialTheme()
}

export const themeSlice = createGenericSlice({
    sliceName: 'theme',
    defaultState: initialState.theme,
    reducers: {
        setTheme: (state, action) => {
            logger.log(action.payload)
            state.data = action.payload

            LocalStorageService.set<Theme>(storageKey, action.payload)
        }
    }
})

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
