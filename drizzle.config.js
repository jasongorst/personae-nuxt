import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "sqlite",
  schema: "./server/db/schema.js",
  out: "./server/db/migrations",
  dbCredentials: {
    url: "./server/db/dev.sqlite3"
  }
})
