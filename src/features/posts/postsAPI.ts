import { createAsyncThunk } from '@reduxjs/toolkit'
import type { PostItem } from './types'
import httpClient from 'src/libraries/http-client'

// Async thunk for retrieving the post data
export const retrievePosts = createAsyncThunk<PostItem[], void, { rejectValue: string }>(
  'posts/retrieve',
  async (_, thunkAPI) => {
    try {
      const res = await httpClient.get('/posts')
      return res.data as PostItem[]
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch issues.')
    }
  },
)
