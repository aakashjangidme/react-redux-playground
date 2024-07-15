const users: User[] = [
  { id: "1", email: "user1@example.com" },
  { id: "2", email: "user2@example.com" },
]

export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate delay for API call
    setTimeout(() => {
      const user = users.find(user => user.email === email)
      if (user) {
        // Simulate successful login
        resolve(user)
      } else {
        reject(new Error("User not found"))
      }
    }, 1000) // Simulate delay
  })
}

export const register = async (
  email: string,
  password: string,
): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate delay for API call
    setTimeout(() => {
      // Mock success scenario
      const newUser: User = { id: String(users.length + 1), email }
      users.push(newUser)
      resolve(newUser)
      // Mock error scenario
      // reject(new Error('Registration failed'));
    }, 1000) // Simulate delay
  })
}

export const logout = async (): Promise<void> => {
  return new Promise(resolve => {
    // Simulate delay for API call
    setTimeout(() => {
      // Simulate successful logout
      resolve()
    }, 500) // Simulate delay
  })
}

// Function to fetch current logged-in user (if any)
export const getCurrentUser = (): User | null => {
  // Simulate fetching user from localStorage or session storage
  const userData = localStorage.getItem("currentUser")
  if (userData) {
    try {
      return JSON.parse(userData)
    } catch (error) {
      console.error("Error parsing user data:", error)
      return null
    }
  }
  return null
}

// Function to set current logged-in user
export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}
