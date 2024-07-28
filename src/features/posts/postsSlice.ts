import { createGenericSlice } from '@/store/createGenericSlice'
import logger from '@/lib/utils/logger'
import { retrievePosts } from './postsAPI'

const initialState: PostItem[] = []

export const postSlice = createGenericSlice<PostItem[], {}>({
    sliceName: 'posts',
    defaultState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrievePosts.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(retrievePosts.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'fulfilled'
                state.error = null
            })
            .addCase(retrievePosts.rejected, (state, action) => {
                state.status = 'rejected'
                //action.payload returns the handled error by thunkAPI.rejectWithValue
                state.error = action.payload?.message || action.error.message || 'Failed to retrieve posts'
                logger.log('retrievePosts.rejected', action)
            })
    }
})
/* 
// Initial state
const initialState: PostsState = {
    data: [],
    status: 'idle',
    error: null
}

// Create the slice
export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrievePosts.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(retrievePosts.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'fulfilled'
                state.error = null
            })
            .addCase(retrievePosts.rejected, (state, action) => {
                state.status = 'rejected'
                //action.payload returns the handled error by thunkAPI.rejectWithValue
                state.error = action.payload?.message || action.error.message || 'Failed to retrieve posts'
                logger.log('retrievePosts.rejected', action)
            })
    }
})

export default postSlice.reducer
 */
