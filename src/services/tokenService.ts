type AuthToken = string | null

const setAccessToken = (token: AuthToken): void => {
    if (token) {
        localStorage.setItem('accessToken', token)
    } else {
        localStorage.removeItem('accessToken')
    }
}

const getAccessToken = (): AuthToken => {
    return localStorage.getItem('accessToken')
}

const setRefreshToken = (token: AuthToken): void => {
    if (token) {
        localStorage.setItem('refreshToken', token)
    } else {
        localStorage.removeItem('refreshToken')
    }
}

const getRefreshToken = (): AuthToken => {
    return localStorage.getItem('refreshToken')
}

const TokenService = { setAccessToken, getAccessToken, setRefreshToken, getRefreshToken }

export default TokenService
