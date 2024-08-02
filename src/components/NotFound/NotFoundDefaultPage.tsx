import { useRouteError } from 'react-router-dom'

const NotFoundDefaultPage = () => {
    const error: any = useRouteError()
    console.error(error)

    return (
        <div className="flex justify-center items-center min-h-screen dark:bg-boxdark-2 dark:text-bodydark">
            <div className="max-w-4xl mx-4 sm:mx-auto p-6  dark:bg-boxdark dark:text-bodydark rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                        <h1 className="text-6xl font-bold  dark:text-bodydark mb-4">404</h1>
                        <p className="text-xl text-gray-600 dark:text-bodydark-2 mb-4">The page you're looking for doesn't exist.</p>
                        <p className="text-md text-gray-500 dark:text-gray-400 mb-6">
                            <i>{error.statusText || error.message}</i>
                        </p>
                        <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
                            Back Home
                        </a>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                            alt="Error"
                            className="w-full h-auto rounded-lg shadow-md dark:bg-boxdark-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundDefaultPage
