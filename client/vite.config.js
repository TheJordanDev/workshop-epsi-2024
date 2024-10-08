import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import path from 'path'

const manifestForPlugin = {
	injectRegister: 'inline',
	registerType: 'prompt',
	includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'safari-pinned-tab.svg', 'site.webmanifest', 'browserconfig.xml'],
	manifest: {
		name: "MindCheck",
		short_name: "MindCheck",
		description: "A quiz app to self-assess your mental health",
		icons: [
			{
				src: "public/vite.svg",
				sizes: "192x192",
				type: "image/svg+xml"
			}
		],
		theme_color: "#000000",
		background_color: "#000000",
		display: "standalone",
		scope: "/",
		start_url: "https://df9f-79-101-139-224.ngrok.io",
		orientation: "portrait",
	}
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		alias({
			entries: [
				{ find: '@', replacement: path.resolve(__dirname, 'src') },
			],
		}),
		VitePWA(manifestForPlugin),	
	],
})
