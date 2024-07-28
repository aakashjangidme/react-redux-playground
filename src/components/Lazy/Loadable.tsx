import type { ComponentType } from 'react'
import type React from 'react'
import { Suspense } from 'react'
import Loader from './Loader'

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
    // eslint-disable-next-line @typescript-eslint/naming-convention
        <P extends object>(Component: ComponentType<P>): React.FC<P> =>
        (props: P) => (
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        )

export default Loadable
