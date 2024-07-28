import type { Middleware } from 'redux'
import logger from '../lib/utils/logger'

const errorHandler: Middleware = (store) => (next) => (action) => {
    try {
        return next(action)
    } catch (err) {
        logger.error('Redux error::', err)
        throw err
    }
}

export default errorHandler
