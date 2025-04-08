import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    include: "./test/**/*.test.js",
    exclude: [ "./test/e2e/**", "./test/mocks/**" ],
    globals: true
  }
})
