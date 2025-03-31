import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 5173,       // Match Docker port
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api/v1',
        changeOrigin: true,
      },
    },
  },
  }),
)
