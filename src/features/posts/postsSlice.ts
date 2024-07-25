import { createSlice } from '@reduxjs/toolkit'

import type { PostsState } from './types'
import { retrievePosts } from './postsAPI'

// Initial state
const initialState: PostsState = {
  data: [],
  loading: 'idle',
  error: null,
}

// Create the slice
export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrievePosts.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(retrievePosts.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = 'fulfilled'
        state.error = null
      })
      .addCase(retrievePosts.rejected, (state, action) => {
        state.loading = 'rejected'
        state.error = action.error.message || 'Failed to retrieve posts'
      })
  },
})

export default postSlice.reducer
