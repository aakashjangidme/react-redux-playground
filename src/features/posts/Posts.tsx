import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material"
import { usePosts } from "./usePosts"

const Posts = () => {
  const { posts, loading, error } = usePosts()

  if (loading)
    return (
      <Container maxWidth={false} disableGutters>
        <Box sx={{ my: 4 }}>
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        </Box>
      </Container>
    )

  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Posts
        </Typography>

        <Card sx={{ minWidth: 275 }}>
          {posts.map(post => (
            <CardContent key={post.id}>
              <Typography
                variant="h5"
                component="h4"
                color="text.primary"
                gutterBottom
              >
                {post.title}
              </Typography>

              <Typography component="p">{post.body}</Typography>
            </CardContent>
          ))}
        </Card>
      </Box>
    </Container>
  )
}

export default Posts
