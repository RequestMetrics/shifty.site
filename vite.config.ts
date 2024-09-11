import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import packageJson from './package.json'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    build: {
        outDir: "./docs/"
    },
    plugins: [preact()],
    define: {
        'import.meta.env.BUILD_TIME': new Date().toISOString(),
        'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
    }
})