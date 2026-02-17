/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
    test: {
        environment: 'happy-dom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{ts,js,tsx,jsx}'],
            exclude: ['src/content/**/*'], // Exclude content collections from coverage
        },
        include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        exclude: ['tests/e2e/**/*', 'node_modules/**/*'],
    },
});
