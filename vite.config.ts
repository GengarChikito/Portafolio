import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from 'vitest/config';

const isTest = process.env.VITEST === 'true';

export default defineConfig({
    plugins: [
        // No incluir reactRouter() durante las pruebas porque el plugin
        // intenta transformar JSX y requiere un preamble que rompe en Vitest.
        // Se incluye solo en desarrollo/producción.
        tailwindcss(),
        ...(isTest ? [] : [reactRouter()]),
        tsconfigPaths(),
    ],
    base: '/',
    build: {
        outDir: 'build/client',
        sourcemap: false
    },
    //Configurar Vitest
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
        include: ['components//*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: [...configDefaults.exclude, '/node_modules/**'],
    },
});