import { LOG_LEVEL } from 'src/config/environment'

/** Signature of a logging function */
export interface LogFn {
    (message?: any, ...optionalParams: any[]): void
}

/** Basic logger interface */
export interface Logger {
    debug: LogFn
    log: LogFn
    warn: LogFn
    error: LogFn
}

/** Log levels */
export type LogLevel = 'debug' | 'log' | 'warn' | 'error'

const NO_OP: LogFn = () => {}

const logWithStyle =
    (level: LogLevel, color: string) =>
    (message?: any, ...optionalParams: any[]) => {
        console.log(`%c[${level}] ${message}`, `color: ${color}`, ...optionalParams)
    }

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
    readonly debug: LogFn
    readonly log: LogFn
    readonly warn: LogFn
    readonly error: LogFn

    constructor(options?: { level?: LogLevel }) {
        const { level } = options || {}

        this.error = logWithStyle('error', 'red')
        this.warn = level === 'error' ? NO_OP : logWithStyle('warn', 'orange')
        this.log = level === 'warn' || level === 'error' ? NO_OP : logWithStyle('log', 'yellow')
        this.debug = level === 'debug' || level === 'log' || level === 'warn' || level === 'error' ? NO_OP : logWithStyle('debug', 'gray')
    }
}

const logger = new ConsoleLogger({ level: LOG_LEVEL })

export default logger
