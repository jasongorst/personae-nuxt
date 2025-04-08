import tailwindcss from "@tailwindcss/vite"

const mockAuthModule = process.env.VITEST ? [ "./test/mocks/setup.js" ] : []

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

  css: [ "~/assets/css/main.css" ],

  devServer: { port: 3001 },

  devtools: {
    enabled: true,
    timeline: { enabled: true }
  },

  future: { compatibilityVersion: 4 },

  imports: {
    presets: [ {
      from: "tailwind-merge",
      imports: [ "twJoin", "twMerge" ]
    } ]
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/test-utils/module",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "nuxt-headlessui",
    "nuxt-lodash",
    ...mockAuthModule
  ],

  runtimeConfig: {
    // placeholders to be overridden by env vars
    auth: { baseUrl: "" },
    public: {
      useApi: { baseURL: "" },
      api: { baseURL: "" }
    }
  },

  vite: {
    build: { sourcemap: false },
    plugins: [ tailwindcss() ],

    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("trix-") || tag.startsWith("action-text-")
        }
      }
    }
  },

  // module configs
  auth: {
    isEnabled: true,

    globalAppMiddleware: {
      unauthenticatedOnly: false,
      navigateAuthenticatedTo: "/",
      navigateUnauthenticatedTo: "/",
      addDefaultCallbackUrl: false
    },

    originEnvKey: "NUXT_AUTH_BASE_URL",

    provider: {
      type: "local",
      pages: { login: "/" },

      endpoints: {
        signUp: false,
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        getSession: { path: "/session", method: "get" }
      },

      token: {
        headerName: "Authorization",
        type: "Bearer",
        signInResponseTokenPointer: "/access_token"
      },

      refresh: {
        isEnabled: true,
        endpoint: {
          path: "/jwt-refresh",
          method: "post"
        },

        refreshOnlyToken: false,

        token: {
          signInResponseRefreshTokenPointer: "/refresh_token",
          refreshResponseTokenPointer: "/access_token",
          refreshRequestTokenPointer: "/refresh_token"
        }
      }
    }
  },

  icon: {
    // defaults
    size: "1em",
    class: "inline",
    mode: "svg",

    aliases: {
      personae: "fa6-solid:masks-theater"
    },

    clientBundle: {
      // list of icons to include in the client bundle
      icons: [],

      // scan all components in the project and include icons
      scan: true,

      // include all custom collections in the client bundle
      includeCustomCollections: true,

      // guard for uncompressed bundle size, will fail the build if exceeds
      sizeLimitKb: 256
    },

    customCollections: [ {
      prefix: "jg",
      dir: "./assets/icons",
      normalizeIconName: false
    } ]
  },

  lodash: {
    prefix: "_",
    prefixSkip: false,
    upperAfterPrefix: false
  }
})
