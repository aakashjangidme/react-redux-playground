import { useRouteError } from 'react-router-dom'

const NotFoundDefaultPage = () => {
  const error: any = useRouteError()
  console.error(error)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mb-4">The page you're looking for doesn't exist.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Back Home</button>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt="Error"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundDefaultPage
