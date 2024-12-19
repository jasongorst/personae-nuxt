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

  compatibilityDate: "2024-11-01",

  components: [
    { path: "~/ui", prefix: "UI" },
    "~/components"
  ],

  devServer: { port: 3001 },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  future: {
    compatibilityVersion: 4
  },

  modules: [
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-auth-utils",
    "nuxt-headlessui",
    "nuxt-lodash"
  ],

  nitro: {
    storage: {
      redis: {
        driver: "redis"
      }
    }
  },

  runtimeConfig: {
    baseURL: "http://localhost:3000/auth"
  },

  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => (tag.startsWith("trix-") || tag.startsWith("action-text-"))
        }
      }
    }
  },

  // module configs
  auth: {
    // nuxt-auth-utils
    webAuthn: true,

    // @sidebase/nuxt-auth
    originEnvKey: "NUXT_BASE_URL", // baseURL from runtimeConfig
    provider: {
      type: "local",
      endpoints: {
        signUp: false,
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        getSession: { path: "/session", method: "get" }
      },
      token: {
        signInResponseTokenPointer: "/access_token"
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: "/jwt-refresh", method: "post" },
        token: {
          signInResponseRefreshTokenPointer: "/refresh_token"
        }
      }
    }
  },

  headlessui: {
    prefix: "H"
  },

  lodash: {
    prefix: "_",
    prefixSkip: false,
    upperAfterPrefix: false
  }
})
