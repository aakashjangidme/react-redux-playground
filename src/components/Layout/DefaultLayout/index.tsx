import ErrorBoundary from 'src/components/ErrorBoundry'
import { Outlet } from 'react-router-dom'

// ==============================|| MINIMAL LAYOUT ||============================== //

const DefaultLayout = () => {
  return (
    <>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  )
}

export default DefaultLayout
