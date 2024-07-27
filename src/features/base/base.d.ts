type FetchStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected'

interface FetchDataParams {
    endpoint: string
    params?: Record<string, any>
}
