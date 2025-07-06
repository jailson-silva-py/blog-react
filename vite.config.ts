import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {

    globals:true,
    environment:"jsdom",
    setupFiles:'src/setupTest.ts',
    coverage: {

      exclude:['vite.config.ts', 'eslint.config.js','src/types', 'src/main.tsx']

    }


  },
})
