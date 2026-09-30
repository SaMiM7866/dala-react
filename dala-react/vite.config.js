import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub repo name
export default defineConfig({
  base: '/dala-react/',
  plugins: [react()],
})