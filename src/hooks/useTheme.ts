import { useCallback, useLayoutEffect } from 'react'

import type { Theme } from '../lib/Theme/themeSlice'
import { setTheme } from '../lib/Theme/themeSlice'
import logger from '@/lib/utils/logger'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store/store'

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

    // Memoize the function to prevent unnecessary re-renders
    const setAppTheme = useCallback(
        (theme: Theme) => {
            console.debug('setAppTheme::theme=', theme)
            dispatch(setTheme(theme))
        },
        [dispatch]
    )

    useLayoutEffect(() => {
        logger.debug('useTheme:useLayoutEffect::=', theme)

        const root = window.document.documentElement

        // Remove old classes
        root.classList.remove('light', 'dark')

        // Determine the new theme
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            root.classList.add(systemTheme)
        } else {
            root.classList.add(theme)
        }
    }, [theme])

    return { theme, isDarkModeEnabled: theme === 'dark', setAppTheme }
}
