import { createFsDrain } from 'evlog/fs'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('evlog:drain', createFsDrain({ pretty: true }))
})
