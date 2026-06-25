import { useLogtoUser } from '#imports';
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useLogtoUser();

  if (!user) {
    return navigateTo('/login')
  }
})
