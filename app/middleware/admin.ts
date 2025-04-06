export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession();

  const isAdmin = user.value?.role === 'admin';

  if (!isAdmin) {
    return navigateTo('/');
  }
});
