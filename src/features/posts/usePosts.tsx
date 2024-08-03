import { retrievePosts } from './postsAPI'

import { selectPosts, selectPostsStatus, selectPostsError } from './postsSlice'
import { useData } from '@/hooks/useData'

export const usePosts = () => {
    const {
        data: posts,
        loading,
        error,
        refetch
    } = useData({
        selectData: selectPosts,
        selectStatus: selectPostsStatus,
        selectError: selectPostsError,
        fetchAction: retrievePosts
    })

    return { posts, loading, error, refetch }
}
