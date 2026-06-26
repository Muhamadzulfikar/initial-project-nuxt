import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  useRuntimeConfig()
})
