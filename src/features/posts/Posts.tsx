import Alert from 'src/components/Alert'
import Spinner from 'src/components/Spinner/Spinner'

import { useData } from '../base/useData'
import { retrievePosts } from './postsAPI'
import { selectPosts, selectPostsStatus, selectPostsError } from './postsSelectors'

const Posts: React.FC = () => {
    const {
        data: posts,
        loading,
        error
    } = useData({
        selectData: selectPosts,
        selectStatus: selectPostsStatus,
        selectError: selectPostsError,
        fetchAction: retrievePosts
    })

    if (loading)
        return (
            <div className="container mx-auto p-4">
                <div className="my-4 flex justify-center">
                    <Spinner />
                </div>
            </div>
        )

    if (error) return <Alert severity="error">{error}</Alert>

    return (
        <div className="container mx-auto p-4">
            <div className="my-4">
                <h1 className="text-4xl mb-2">Posts</h1>
                <div className="bg-white rounded shadow-md p-4">
                    {posts?.map((post) => (
                        <div key={post.id} className="mb-4">
                            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Posts
