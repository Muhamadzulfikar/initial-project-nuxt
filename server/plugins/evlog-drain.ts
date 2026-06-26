import { createFsDrain } from 'evlog/fs'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('evlog:drain', createFsDrain({
    maxSizePerFile: 10 * 1024 * 1024
  }))
})
