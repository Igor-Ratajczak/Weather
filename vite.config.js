import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Weather/', // !!!!!!!!!
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['./img/icons/weather/svg/*'],
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        // ...Other pwa config options
        theme_color: '#0000ff',
        icons: [
          {
            src: 'img/icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'img/icons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: 'img/icons/apple-touch-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: 'img/icons/safari-pinned-tab.svg',
            sizes: '16x16',
            type: 'image/svg+xml'
          },
          {
            src: 'img/icons/msapplication-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'img/icons/sunny.png',
            sizes: '24x24',
            type: 'image/png'
          },
          {
            src: 'img/icons/night.png',
            sizes: '24x24',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  pwa: {
    // ...Other pwa config options
    name: 'Weather 2.0',
    short_name: 'Weather 2.0',
    theme_color: '#0000ff',
    msTileColor: '#0000ff',
    description:
      'Aplikacja pogodowa, która ułatwi tobie sprawdzanie prognozy w sposób szybki i poręczny.',
    id: 'weather',
    start_url: './',
    display: 'standalone',
    background_color: '#000000',
    icons: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    appleMobileWbeAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#0000ff',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './sw.js',
      exclude: [/_redirect/, /\.map$/, /_headers/]
    },

    manifestOptions: {
      background_color: '#0000ff'
    }
  }
})
