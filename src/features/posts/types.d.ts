// Define the type for the post items (adjust this according to the actual data structure)
interface PostItem {
    userId: number
    id: number
    title: string
    body: string
}

// Define the initial state type
interface PostsState {
    data: PostItem[]
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: string | null
}
