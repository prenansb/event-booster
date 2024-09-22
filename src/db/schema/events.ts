import { users } from '@/db/schema/users'
import { text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  owner: uuid('owner').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  closedAt: timestamp('closed_at').defaultNow().notNull(),
})
