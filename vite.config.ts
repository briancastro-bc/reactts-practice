import path from 'node:path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@apps': path.resolve(__dirname, './src/apps'),
      '@ioc': path.resolve(__dirname, './src/ioc'),
      '@state': path.resolve(__dirname, './src/apps/state'),
      '@contexts': path.resolve(__dirname, './src/contexts/'),
      '@Shared': path.resolve(__dirname, './src/apps/Shared'),
    },
  },
})
