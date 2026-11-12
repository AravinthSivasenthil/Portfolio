import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages initially serves the repository under /Portfolio/.
  // Set SITE_BASE_PATH=/ when the custom domain aravinth.ca is connected.
  base: process.env.SITE_BASE_PATH ?? (process.env.GITHUB_ACTIONS ? '/Portfolio/' : '/'),
});
