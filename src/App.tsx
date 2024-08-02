import { useState, useLayoutEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import Loader from './components/Loader'
import router from './router'
import logger from './lib/utils/logger'
import { useTheme } from './hooks/useTheme'

export default function App() {
    const [showSplashScreen, setShowSplashScreen] = useState(true)
    const { isDarkModeEnabled } = useTheme()

    logger.debug('isDarkModeEnabled::', isDarkModeEnabled)

    useLayoutEffect(() => {
        const checkNavigationState = () => {
            const navState = router.state?.navigation?.state
            console.debug('Navigation State:', navState) // Debugging

            if (navState === 'idle') {
                setShowSplashScreen(false)
                return true // Return true to stop further checks
            }
            return false // Continue checking
        }

        const intervalId = setInterval(() => {
            if (checkNavigationState()) {
                clearInterval(intervalId) // Clear interval if state is 'idle'
            }
        }, 500)

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId)
    }, []) // Empty dependency array to run effect only once

    return <>{showSplashScreen ? <Loader /> : <RouterProvider router={router} />}</>
}
