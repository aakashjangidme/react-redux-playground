import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        open: true,

        proxy: { '/api': 'http://localhost:3000', '/posts': 'https://jsonplaceholder.typicode.com' }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/setupTests',
        mockReset: true
    },
    build: {
        outDir: 'build'
    }
})
