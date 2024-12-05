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

  compatibilityDate: "2024-11-27",

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
    "@pinia-plugin-persistedstate/nuxt",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "nuxt-lodash"
  ],

  auth: {
    isEnabled: true,
    baseURL: "http://localhost:3000/",
    disableServerSideAuth: false,
    globalAppMiddleware: true,
    provider: {
      type: "local",
      pages: {
        login: "/user/sign-in"
      },
      endpoints: {
        signIn: { path: "auth/login", method: "post" },
        signOut: { path: "auth/logout", method: "post" },
        signUp: false,
        getSession: { path: "auth/session", method: "get" }
      },
      token: {
        signInResponseTokenPointer: "/access_token",
        type: "Bearer",
        cookieName: "auth.token",
        headerName: "Authorization",
        maxAgeInSeconds: 1800,
        sameSiteAttribute: "lax",
        cookieDomain: "",
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: "auth/jwt-refresh", method: "POST" },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: "/refresh_token",
          refreshResponseTokenPointer: "",
          refreshRequestTokenPointer: "/refresh_token",
          cookieName: "auth.token",
          maxAgeInSeconds: 1800,
          sameSiteAttribute: "lax",
          cookieDomain: "",
          secureCookieAttribute: false,
          httpOnlyCookieAttribute: false
        }
      },
      session: {
        dataType: {
          email: "string",
          admin: "boolean"
        }
      }
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false,
    }
  },

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
