// postsSelectors.ts
import type { RootState } from 'src/store/store'

// Define selectors for posts
export const selectPosts = (state: RootState) => state.posts.data
export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error
