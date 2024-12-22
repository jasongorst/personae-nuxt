import { drizzle } from "drizzle-orm/libsql"
import * as schema from "../db/schema.js"

export { sql, eq, and, or } from "drizzle-orm"

export const tables = schema

export function useDB() {
  const runtimeConfig = useRuntimeConfig()

  return drizzle(runtimeConfig.dbUrl, { schema })
}
