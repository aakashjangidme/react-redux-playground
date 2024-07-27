import { createGenericThunk } from 'src/store/createGenericThunk'
import PostService from 'src/services/postService'

export const retrievePosts = createGenericThunk<PostItem[], void>('posts/retrieve', PostService.fetchPosts, {
    retry: 1, // Retry up to 1 times
    logError: true // Enable error logging
})

/*
Async thunk for retrieving the post data
export const retrievePosts = createAsyncThunk<PostItem[], void, { rejectValue: CustomSerializedError }>('posts/retrieve', async (_, thunkAPI) => {
    try {
        // Fetch posts from the API
        const response = await httpClient.get<PostItem[]>('/posts')
        // Return the data directly from the response
        return response
    } catch (error) {
        // Log the error and return a custom serialized error
        const serializedError = handleHttpError(error)
        logger.error('retrievePosts::handleHttpError', serializedError)
        return thunkAPI.rejectWithValue(serializedError)
    }
})
*/
