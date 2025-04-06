# Nuxt Auth Utils Demo

[Nuxt 3](https://nuxt.com/docs/getting-started/installation) + [Nuxt Auth Utils](https://nuxt.com/modules/auth-utils) + [Nuxt Authorization](https://github.com/Barbapapazes/nuxt-authorization) + [NuxtUI](https://ui3.nuxt.dev/getting-started) simple auth demo

Based on this [recipe](https://nuxt.com/docs/guide/recipes/sessions-and-authentication).

And also credits to this [blog post](https://soubiran.dev/posts/nuxt-going-full-stack-how-to-handle-authorization).

## Development

0. Make sure to install dependencies:

```sh
pnpm i
```

1. Copy [`.env.example`](.env.example) to `.env`.

2. Create database

```sh
pnpm db:push
```

3. Start the development server on [`http://localhost:3000`](localhost:3000):

```sh
pnpm dev
```

## Production

> [!IMPORTANT]
> YOU SHOULD HAVE [`.env`](.env) file with NUXT_SESSION_PASSWORD and DB_FILE_NAME variables. Example in .env.example

Build the application for production:

```sh
pnpm build
```

Locally preview production build:

```sh
pnpm preview
```
