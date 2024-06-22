export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "icon", href: "/theater-masks-solid.svg" },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "mask-icon", href: "/theater-masks-solid.svg", color: "#6e0b75" }
      ],
      meta: [
        { charset: "UTF-8" },
        { name: "theme-color", content: "#6e0b75" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" }
      ],
      title: "Dramatis Personae"
    }
  },
  devtools: { enabled: true },
  devServer: { port: 3001 },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-lodash"
  ],
  lodash: {
    prefix: "_",
    prefixSkip: false,
    upperAfterPrefix: false
  },
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => (tag.startsWith("trix-") || tag.startsWith("action-text-"))
        }
      }
    }
  }
})
