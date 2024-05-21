import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { templateCompilerOptions } from '@tresjs/core';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      // Add more aliases if needed
    },
  },
});
