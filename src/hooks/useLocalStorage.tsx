import { useEffect, useState } from 'react'
import LocalStorageService from './index'

type SetValue<T> = T | ((val: T) => T)

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: SetValue<T>) => void] {
    // State to store our value
    // Pass  initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            return LocalStorageService.get<T>(key) ?? initialValue
        } catch (error) {
            // If error also return initialValue
            console.log(error)
            return initialValue
        }
    })

    // useEffect to update local storage when the state changes
    useEffect(() => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = typeof storedValue === 'function' ? storedValue(storedValue) : storedValue
            // Save state
            LocalStorageService.set(key, valueToStore)
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}

export default useLocalStorage
