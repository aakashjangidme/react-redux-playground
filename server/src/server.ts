import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { authRoutes } from './routes'
import { errorHandler } from './middleware'

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

// Register routes
app.use('/api/auth', authRoutes)

// Error handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
