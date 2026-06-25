// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@logto/nuxt'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    forced: true
  },
  runtimeConfig: {
    logto: {
      endpoint: '',
      appId: '',
      appSecret: '',
      cookieEncryptionKey: '',
    }
  },
  logto: {
    pathnames: {
      signIn: '/login',
      signOut: '/logout',
      callback: '/auth/callback',
    },
  },
})
