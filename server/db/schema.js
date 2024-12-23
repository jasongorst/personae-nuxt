import { sqliteTable, text, integer, unique } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  admin: integer("admin", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  lastLoginAt: integer("last_login_at", { mode: "timestamp" }).notNull()
})

export const credentials = sqliteTable("credentials", {
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  id: text("id").notNull().unique(),
  publicKey: text("public_key").notNull(),
  counter: integer("counter").notNull(),
  backedUp: integer("backed_up", { mode: "boolean" }).notNull(),
  transports: text("transports", { mode: "json" }).notNull()
}, table => ({
  pk: unique().on(table.userId, table.id)
}))

/**
 * Relations (useful for queries)
 */

export const usersRelations = relations(users, ({ many }) => ({
  credentials: many(credentials)
}))

export const credentialsRelations = relations(credentials, ({ one }) => ({
  user: one(users, {
    fields: [credentials.userId],
    references: [users.id]
  })
}))
