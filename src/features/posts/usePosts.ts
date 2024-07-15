import { useAppDispatch, useAppSelector } from "./../../store/hooks"

import { retrievePosts } from "./postsAPI"
import type { RootState } from "../../store/store"
import useUpdateEffect from "../../store/useUpdateEffect"

export const usePosts = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state: RootState) => state.posts.data)
  const loading = useAppSelector(
    (state: RootState) =>
      state.posts.loading === "pending" || state.posts.loading === "idle",
  )
  const error = useAppSelector((state: RootState) => state.posts.error)

  useUpdateEffect(() => {
    dispatch(retrievePosts())
  }, [dispatch])

  return { posts, loading, error }
}
