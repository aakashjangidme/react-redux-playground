import type { Response } from 'express'
import type { HttpResponseData } from '../types'

export function sendSuccessResponse<T>(res: Response, data: T, message?: string) {
    const response: HttpResponseData<T> = {
        data,
        message,
        status: 200,
        code: 'OK'
    }
    res.status(200).json(response)
}

export function sendErrorResponse(res: Response, statusCode: number, message: string, code?: string) {
    const response: HttpResponseData = {
        code,
        message,
        status: statusCode
    }
    res.status(statusCode).json(response)
}
