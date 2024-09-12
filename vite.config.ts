import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import packageJson from './package.json'
import { resolve } from 'path'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    base: "/",
    build: {
        outDir: "./dist/",
        rollupOptions: {
            input: {
                home: resolve(__dirname, "index.html"),
                game: resolve(__dirname, "game.html")
            }
        }
    },
    plugins: [preact()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        }
    },
    define: {
        'import.meta.env.BUILD_TIME': new Date().toISOString(),
        'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
    }
})