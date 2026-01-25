import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '');
  const applicationPort = Number(environment.PORT) || 5173
  return {
    plugins: [react()],
    define: {
      "process.env": {
        API_BASE_URL: environment.API_BASE_URL,
      }
    },
    server: {
      port: applicationPort,
    },
  };
});

