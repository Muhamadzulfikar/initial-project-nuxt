// https://nuxt.com/docs/api/configuration/nuxt-config

import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'node:path'

const createDailyTransport = (filename: string, level: string) => {
    return new DailyRotateFile({
        filename: path.resolve(process.cwd(), `logs/${filename}-%DATE%.log`),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        level: level
    })
}

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        createDailyTransport('activity', 'info'),
        createDailyTransport('error', 'error')
    ]
})

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/ui', '@logto/nuxt', 'evlog/nuxt'],
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
    evlog: {
        env: {
            service: 'initial-project-nuxt',
        },
        drain: async (event) => {
            const isError = event.error || (event.data && event.data.error)
            isError ? logger.error(event) : logger.info(event)
        }
    },
})
