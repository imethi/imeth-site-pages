import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: If your repo name is different, change base to '/<your-repo-name>/'
export default defineConfig({
  base: '/imeth-site-pages/',
  plugins: [react()],
})
