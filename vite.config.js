import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/postcss'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/yayr-portfolio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
