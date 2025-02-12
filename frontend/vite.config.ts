import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "../dist/frontend"), // ✅ Ensures frontend build goes inside dist
    emptyOutDir: true, // ✅ Clears previous builds
  }
});