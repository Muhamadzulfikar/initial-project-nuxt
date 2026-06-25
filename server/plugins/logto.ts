import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (config.logto?.endpoint && config.logto?.appId) {
    await logtoEventHandler(event, config)
  }
})
