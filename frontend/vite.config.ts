import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfig from './tsconfig.json';

export default defineConfig({
  react: {
    useModernSyntax: false,
    jsxTransform: 'experimental',
    jsxImportSource: 'react',
  },
  plugins: [
    react(),
  ],
  css: {
    devStyleOnly: true,
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})