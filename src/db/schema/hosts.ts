import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const hosts = pgTable('hosts', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
