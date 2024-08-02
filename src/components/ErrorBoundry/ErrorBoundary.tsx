import type { ReactNode } from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import logger from '@/lib/utils/logger'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        logger.error('ErrorBoundary caught an error', error, errorInfo)
    }

    handleReload = () => {
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex justify-center items-center min-h-screen dark:bg-boxdark-2 dark:text-bodydark">
                    <div className="max-w-4xl mx-4 sm:mx-auto p-6  dark:bg-boxdark dark:text-bodydark rounded-lg shadow-lg">
                        <h1 className="text-2xl font-medium text-red-500 mb-4">Uh Oh! Something went wrong.</h1>
                        <p className="text-gray-700 mb-6">We encountered an error while processing your request. Please try again later.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={this.handleReload}
                                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out dark:text-white"
                            >
                                Reload
                            </button>
                            <Link to="/" className="px-4 py-2 bg-gray-500  rounded-lg hover:bg-gray-600 transition duration-150 ease-in-out dark:bg-boxdark-2">
                                Go to Home
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
