import path from 'node:path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Shared': path.resolve(__dirname, './src/apps/Shared'),
    },
  },
})
