import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// import eslint from 'vite-plugin-eslint';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env.VITE_APP_REFERENCE_NAME': JSON.stringify(env.VITE_APP_REFERENCE_NAME),
    },
    server: {
      host: '0.0.0.0',
    },
  };
});
