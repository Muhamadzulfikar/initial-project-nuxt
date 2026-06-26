import {useLogtoUser} from '#imports';

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useLogtoUser();

    const publicRoutes = ['/login', '/auth/callback', '/logout']

    if (!user && !publicRoutes.includes(to.path)) {
        return navigateTo('/login')
    }

    if (user && to.path === '/login') {

        return navigateTo('/')

    }
})
