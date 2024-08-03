import LocalStorageService from '@/lib/LocalStorage'
import logger from '@/lib/utils/logger'
import { createGenericSlice } from '@/store/createGenericSlice'

export type Theme = 'dark' | 'light' | 'system'

type ThemeState = {
    theme: Theme
}

const storageKey = 'app-ui-theme'

const defaultTheme: Theme = 'system'

const _getInitialTheme = (): Theme => {
    return LocalStorageService.get<Theme>(storageKey) || defaultTheme
}

logger.debug('_getInitialTheme::', _getInitialTheme())

const initialState: ThemeState = {
    theme: _getInitialTheme()
}

export const themeSlice = createGenericSlice({
    sliceName: 'theme',
    defaultState: initialState.theme,
    reducers: {
        setTheme: (state, action) => {
            logger.debug('themeSlice::setTheme=', action.payload)
            state.data = action.payload

            LocalStorageService.set<Theme>(storageKey, action.payload)
        }
    }
})

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
