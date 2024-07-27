const getCurrentUser = (): User | null => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
        try {
            return JSON.parse(currentUser)
        } catch (error) {
            console.error('Error parsing user data:', error)
            return null
        }
    }
    return null
}

const setCurrentUser = (user: User | null): void => {
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
    } else {
        localStorage.removeItem('currentUser')
    }
}

const UserService = { getCurrentUser, setCurrentUser }

export default UserService
