import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Project site served from https://hopezh.github.io/oat_garden_v01/
  // Must exactly match "/<repo-name>/" (both slashes) or the first deploy is blank.
  base: '/oat_garden_v01/',
})
