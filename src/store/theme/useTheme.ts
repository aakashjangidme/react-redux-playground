import { useAppDispatch, useAppSelector } from '../hooks'
import type { RootState } from '../store'
import useUpdateEffect from '../useUpdateEffect'
import type { Theme } from './themeSlice'
import { setTheme } from './themeSlice'
import logger from '@/lib/utils/logger'

/**
 * Custom hook to manage and toggle the theme (dark mode) state.
 *
 * This hook provides the current theme state and a function to toggle the theme.
 *
 * @returns {Object} An object containing the current theme state and a function to toggle the theme.
 * @returns {Theme} theme - The current theme state.
 * @returns {boolean} isDarkModeEnabled - Indicates whether dark mode is enabled.
 * @returns {Function} setAppTheme - Function to set the theme state.
 *
 * @example
 * const { theme, isDarkModeEnabled, setAppTheme } = useTheme()
 *
 * // Toggle the theme
 * setAppTheme('dark')
 *
 * // Explicitly set dark mode
 * setAppTheme('dark')
 *
 * // Explicitly set light mode
 * setAppTheme('light')
 */
export const useTheme = () => {
    const dispatch = useAppDispatch()

    const theme = useAppSelector((state: RootState) => state.theme.data!)

    logger.log('useTheme::theme::', theme)

    const isDarkModeEnabled = theme === 'dark'

    /**
     * Sets the theme state.
     *
     * @param {Theme} theme - The theme to be set.
     */
    const setAppTheme = (theme: Theme) => {
        dispatch(setTheme(theme))
    }

    useUpdateEffect(() => {
        const root = window.document.documentElement

        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    return { theme, isDarkModeEnabled, setAppTheme }
}
