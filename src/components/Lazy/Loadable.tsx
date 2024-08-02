/* eslint-disable @typescript-eslint/naming-convention */
import type { ComponentType } from 'react'
import type React from 'react'
import { Suspense } from 'react'
// import Loader from '../Loader'

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
    <P extends object>(Component: ComponentType<P>): React.FC<P> =>
    (props: P) => (
        <Suspense fallback={<LoaderX />}>
            <Component {...props} />
        </Suspense>
    )

export default Loadable

const LoaderX = () => {
    return (
        <div role="status">
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="w-full">
                    <div className="h-1 bg-blue-500 animate-pulse"></div>
                    {/* <Loader /> */}
                </div>
            </div>
        </div>
    )
}
