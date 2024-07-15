// Define the type for the post items (adjust this according to the actual data structure)
export interface PostItem {
  userId: number
  id: number
  title: string
  body: string
}

// Define the initial state type
export interface PostsState {
  data: PostItem[]
  loading: "idle" | "pending" | "fulfilled" | "rejected"
  error: string | null
}
