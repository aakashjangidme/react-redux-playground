import httpClient from '@/libraries/http-client'

const fetchPosts = () => httpClient.get<PostItem[]>('/posts')

const PostService = { fetchPosts }

export default PostService
