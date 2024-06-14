// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: { port: 3001 },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-lodash"
  ],
  lodash: {
    prefix: "_",
    prefixSkip: false,
    upperAfterPrefix: false
  },
  app: {
    head: {
      meta: [
        { charset: "UTF-8" },
        { name: "theme-color", content: "#ff9a33" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" }
      ],
      link: [
        { rel: "icon", href: "/users-rays-solid.svg" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "mask-icon", href: "/users-rays-solid.svg", color: "#ff9a33" }
      ]
    }
  }
})
