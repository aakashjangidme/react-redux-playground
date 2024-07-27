/**
 * Module declaration for SVG files.
 * This allows importing SVG files as React components.
 */
declare module '*.svg' {
    /**
     * React component type for SVG files.
     * This component accepts SVG attributes and renders the SVG.
     */
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    export default content
}

/**
 * Interface for custom serialized errors.
 * Provides additional fields to standardize error information.
 */
interface CustomSerializedError {
    /** The name of the error */
    name?: string
    /** A descriptive message for the error */
    message?: string
    /** A stack trace for debugging */
    stack?: string
    /** An optional error code */
    code?: string
}
