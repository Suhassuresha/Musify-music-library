import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'music_library',
      filename: 'remoteEntry.js',
      exposes: {
        './MusicLibrary': './src/App.jsx',
      },
      remotes: undefined, 
      shared: ['react', 'react-dom', 'framer-motion'],
      dev: true,
    }),
  ],
  server: {
    port: 4174, 
  },
  preview: {
    port: 4174, 
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
