import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
const oneYearInSeconds = 60 * 60 * 24 * 365

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    https: false,
    headers: {
      'Strict-Transport-Security': `max-age=${oneYearInSeconds}`,
    },
  },
})
