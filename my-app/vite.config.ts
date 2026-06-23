import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '');
  const backendTarget = env.VITE_BACKEND_URL || 'http://localhost:3000';

  return {
    envDir: '../',
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.js'],
      globals: true,
    },
    resolve: {
      // Built-in tsconfig path resolution (Vite 8)
      tsconfigPaths: true,
    },
  };
});
