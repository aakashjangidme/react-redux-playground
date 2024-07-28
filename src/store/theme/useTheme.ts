import { useAppDispatch, useAppSelector } from '../hooks'
import type { RootState } from '../store'
import { setDarkMode, ThemeMode } from './themeSlice'

/**
 * Custom hook to manage and toggle the theme (dark mode) state.
 *
 * This hook provides the current theme state and a function to toggle the theme.
 *
 * @returns {Object} An object containing the current theme state and a function to toggle the theme.
 * @returns {boolean} isEnabled - Indicates whether dark mode is enabled.
 * @returns {Function} toggleTheme - Function to toggle the dark mode state. It accepts an optional boolean parameter to explicitly set the dark mode state.
 *
 * @example
 * const { isEnabled, toggleTheme } = useTheme()
 *
 * // Toggle the theme
 * toggleTheme(null)
 *
 * // Explicitly set dark mode
 * toggleTheme(true)
 *
 * // Explicitly set light mode
 * toggleTheme(false)
 */
export const useTheme = () => {
    const dispatch = useAppDispatch()

    const isDarkModeEnabled = useAppSelector((state: RootState) => state.theme.data === ThemeMode.Dark)

    /**
     * Toggles the dark mode state.
     *
     * @param {boolean | null} [enabled=null] - Optional parameter to explicitly set the dark mode state. If null, it toggles the current state.
     */
    const toggleTheme = (enabled: boolean | null = null) => {
        dispatch(setDarkMode(enabled))
    }

    return { isDarkModeEnabled, toggleTheme }
}
