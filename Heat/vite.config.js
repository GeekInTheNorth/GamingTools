import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.jsx'),
      name: 'HeatLegendsGenerator',
      formats: ['iife'],
      fileName: () => 'heat-legends-generator.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'heat-legends-generator.css';
          }
          return assetInfo.name;
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
