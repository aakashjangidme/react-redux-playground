// localStorageService.ts

/**
 * Retrieves an item from local storage.
 *
 * @param key - The key of the item to retrieve.
 * @returns The item associated with the key, or null if not found.
 */
const get = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key)
        return item ? (JSON.parse(item) as T) : null
    } catch (error) {
        console.error(`Error retrieving localStorage item "${key}":`, error)
        return null
    }
}

/**
 * Sets an item in local storage.
 *
 * @param key - The key under which to store the item.
 * @param value - The value to store. It will be stringified before storing.
 */
const set = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error(`Error setting localStorage item "${key}":`, error)
    }
}

/**
 * Removes an item from local storage.
 *
 * @param key - The key of the item to remove.
 */
const remove = (key: string): void => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.error(`Error removing localStorage item "${key}":`, error)
    }
}

/**
 * Clears all items from local storage.
 */
const clearAll = (): void => {
    try {
        localStorage.clear()
    } catch (error) {
        console.error('Error clearing localStorage:', error)
    }
}

const LocalStorageService = { get, set, remove, clearAll }

export default LocalStorageService
