import path from 'path';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Note: a plain config object (not `defineConfig`) is used so the
// `ssgOptions` field consumed by vite-react-ssg type-checks cleanly.
export default ({ mode }: { mode: string }) => {
  loadEnv(mode, '.', '');
  return {
    base: '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Consumed by `vite-react-ssg` (see the "build" script in package.json).
    ssgOptions: {
      entry: 'index.tsx',
      script: 'async',
      formatting: 'minify',
    },
  };
};
