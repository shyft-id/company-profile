// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      {
        code: 'id',
        file: 'id-ID.json'
      },
      {
        code: 'en',
        file: 'en-US.json'
      }
    ],
    langDir: 'lang',
    defaultLocale: 'en',
    detectBrowserLanguage: false
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Shyft - Helping teams shift to AI, one system at a time',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AI-powered automation solutions to streamline your business operations and scale faster.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/simplified-logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap', rel: 'stylesheet' }
      ]
    }
  }
})
