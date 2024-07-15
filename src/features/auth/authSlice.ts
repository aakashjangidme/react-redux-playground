import { createSlice } from "@reduxjs/toolkit"
import { userLogin, userLogout, userRegister } from "./authAPI"
import { getCurrentUser } from "../../services/auth.service"

const initialState: AuthState = {
  isAuthenticated: getCurrentUser() !== null || getCurrentUser() !== undefined,
  loading: false,
  error: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to sign in"
      })
      .addCase(userRegister.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to register"
      })
      .addCase(userLogout.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogout.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = false
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to register"
      })
  },
})

export default authSlice.reducer
