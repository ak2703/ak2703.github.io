import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  // Use template.html as the entry so the build script never overwrites it
  build: {
    outDir: 'dist',
    assetsInlineLimit: Infinity,
    rollupOptions: {
      input: 'template.html',
    },
  },
})
