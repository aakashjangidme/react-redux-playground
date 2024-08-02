import httpClient from '@/lib/HttpClient'

const fetchPosts = () => httpClient.get<PostItem[]>('/posts')

const PostService = { fetchPosts }

export default PostService
