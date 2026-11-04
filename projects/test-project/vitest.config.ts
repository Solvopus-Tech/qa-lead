import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  coverage: {
    include: [path.resolve(__dirname, './src/**/*')],
    reporter: ['text', 'json', 'html']
  },
  test: {
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    environment: 'node',
  },
});