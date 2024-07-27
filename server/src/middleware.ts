import type { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack)
    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong!'
    res.status(statusCode).json({ message: message })
}
