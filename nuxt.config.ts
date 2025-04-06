// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    'nuxt-authorization',
  ],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
});
