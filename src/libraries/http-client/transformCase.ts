/**
 * Convert keys to camelCase
 * @param {any} object - Object to transform
 * @returns {any} - Transformed object with camelCase keys
 */
const toCamelCase = (object: any): any => {
    if (typeof object === 'object' && object !== null) {
        if (Array.isArray(object)) {
            return object.map(toCamelCase)
        }
        const transformedObject: { [key: string]: any } = {}
        for (const key in object) {
            if (object[key] !== undefined) {
                const newKey = key.replace(/[_-](\w)/g, (_, k) => k.toUpperCase())
                transformedObject[newKey] = toCamelCase(object[key])
            }
        }
        return transformedObject
    }
    return object
}

/**
 * Convert keys to snake_case
 * @param {any} object - Object to transform
 * @returns {any} - Transformed object with snake_case keys
 */
const toSnakeCase = (object: any): any => {
    if (typeof object === 'object' && object !== null) {
        if (Array.isArray(object)) {
            return object.map(toSnakeCase)
        }
        const transformedObject: { [key: string]: any } = {}
        for (const key in object) {
            if (object[key] !== undefined) {
                const newKey = key.replace(/\.?([A-Z]+)/g, (_, y) => `_${y.toLowerCase()}`).replace(/^_/, '')
                transformedObject[newKey] = toSnakeCase(object[key])
            }
        }
        return transformedObject
    }
    return object
}

export { toCamelCase, toSnakeCase }
