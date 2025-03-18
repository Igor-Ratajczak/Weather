// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  ssr: false,
  modules: ['@vite-pwa/nuxt', '@vite-pwa/nuxt'],
  pwa: {
    strategies: 'generateSW',
    registerType: 'prompt',
    workbox: {
      globPatterns: ['**/*.{html,js,css,ico,png,svg,webmanifest,json}'],
      skipWaiting: false,
      clientsClaim: false,
      maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
    },
    manifest: {
      name: 'Weather 2.0',
      short_name: 'Weather',
      description: 'Aplikacja pogodowa, która ułatwi tobie sprawdzanie prognozy w sposób szybki i poręczny.',
      theme_color: '#000000',
      background_color: '#025a28',
      id: './',
      start_url: './',
      display: 'standalone',
      lang: 'pl',
      icons: [
        {
          src: './web-app-manifest-144x144.png',
          sizes: '144x144',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: './web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: './web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: './web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: './web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      screenshots: [
        {
          src: './screenshot_home.png',
          sizes: '1600x1200',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'Pogoda w Twoim mieście',
        },
        {
          src: './screenshot_background.png',
          sizes: '1600x1200',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'Tło dostosowane do Twojej aktualnej pogody',
        },
        {
          src: './screenshot_home.png',
          sizes: '1600x1200',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Pogoda w Twoim mieście',
        },
        {
          src: './screenshot_background.png',
          sizes: '1600x1200',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Tło dostosowane do Twojej aktualnej pogody',
        },
      ],
    },
  },
});
