import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // GitHub Pages serves this repo from the `docs/` folder on `main`
    // ("Deploy from a branch"), so the build output is committed rather than
    // produced by CI. Building straight into docs/ keeps `npm run build` the
    // single command that refreshes what gets published.
    outDir: 'docs',
    emptyOutDir: true,

    // Split heavy third-party libraries into their own cacheable chunks
    // so the main bundle stays small and returning visitors hit the cache.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['react-icons'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{js,jsx}'],
  },
})
