import { createGenericSlice } from '@/store/createGenericSlice'
import TokenService from '@/services/tokenService'
import { userLogin, userLogout, userRefreshToken } from './authAPI'

const initialState: GenericState<AuthState> = {
    data: {
        accessToken: TokenService.getAccessToken(),
        refreshToken: TokenService.getRefreshToken()
    },
    status: 'idle',
    error: null
}

export const authSlice = createGenericSlice({
    sliceName: 'auth',
    defaultState: initialState.data,
    reducers: {
        setTokens(state, action) {
            state.data = action.payload

            TokenService.setAccessToken(action.payload.accessToken)
            TokenService.setRefreshToken(action.payload.refreshToken)
        },
        clearTokens(state) {
            state.data = initialState.data

            TokenService.setAccessToken(null)
            TokenService.setRefreshToken(null)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'fulfilled'
                state.error = null

                TokenService.setAccessToken(action.payload.accessToken)
                TokenService.setRefreshToken(action.payload.refreshToken)
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload?.message || null
            })
            .addCase(userLogout.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.data = initialState.data
                state.status = 'fulfilled'
                state.error = null

                TokenService.setAccessToken(null)
                TokenService.setRefreshToken(null)
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload?.message || null
            })
            .addCase(userRefreshToken.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(userRefreshToken.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'fulfilled'
                state.error = null

                TokenService.setAccessToken(action.payload.accessToken)
                TokenService.setRefreshToken(action.payload.refreshToken)
            })
            .addCase(userRefreshToken.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload?.message || action.error.message || 'Failed to retrieve posts'
            })
    }
})

export const { setTokens, clearTokens } = authSlice.actions
export default authSlice.reducer
