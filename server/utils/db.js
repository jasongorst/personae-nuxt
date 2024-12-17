import { drizzle } from "drizzle-orm/libsql"
import * as schema from "../db/schema.js"

export { sql, eq, and, or } from "drizzle-orm"

export const tables = schema

export function useDB() {
  return drizzle(process.env.DB_URL, { schema })
}
