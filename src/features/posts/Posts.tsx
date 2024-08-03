import { usePosts } from './usePosts'
import Alert from '@/components/Alert'
import Breadcrumb from '@/components/Breadcrumb'
import Spinner from '@/components/Spinner/Spinner'

const Posts = () => {
    const { posts, loading, error } = usePosts()

    if (error) return <Alert severity="error">{error}</Alert>

    return (
        <>
            <Breadcrumb pageName="Posts" />

            {loading ? (
                <div className="container mx-auto p-4">
                    <div className="my-4 flex justify-center">
                        <Spinner />
                    </div>
                </div>
            ) : (
                <div className=" overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        {posts?.map((post) => (
                            <div key={post.id} className="mb-4">
                                <h2 className="font-medium text-lg  text-black dark:text-bodydark1">{post.title}</h2>
                                <p className="font-normal text-md text-black dark:text-bodydark2">{post.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Posts
