// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: [
        '@nuxt/ui',
        '@logto/nuxt',
        'evlog/nuxt',
        '@nuxtjs/i18n',
        '@nuxthub/core'
    ],
    css: ['~/assets/css/main.css'],
    colorMode: {
        preference: 'dark',
        fallback: 'dark',
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
    evlog: {
        env: {
            service: 'initial-project-nuxt',
        },
    },
    i18n: {
        defaultLocale: 'en',
        locales: [
            {code: 'en', name: 'English', file: 'en.json'},
            {code: 'id', name: 'Indonesia', file: 'id.json'}
        ]
    },
    hub: {
        database: true,
        cache: true,
        kv: true,
    },
})
