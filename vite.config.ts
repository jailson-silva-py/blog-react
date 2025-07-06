import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {

    proxy: {

      "/api":{

        target: 'http:localhost:3000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\api/, ''),

      }

    }

  },
  test: {
//DEFININDO A VARÁVEL PARA AMBIENTE DE TESTES PARA NÃO RETORNAR UNDEFINED EM API (api.ts)
    env:{VITE_API_URL:'http://localhost:3000'},
    globals:true,
    environment:"jsdom",
    setupFiles:'src/setupTest.ts',
    coverage: {

      exclude:['vite.config.ts', 'eslint.config.js','src/types', 'src/main.tsx']

    },
  },
})
