import { hosts } from '@/db/schema/hosts'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  owner: uuid('owner')
    .references(() => hosts.id)
    .notNull(),
  startsAt: timestamp('starts_at', { mode: 'date' }).notNull(),
  closesAt: timestamp('closes_at', { mode: 'date' }).notNull(),
})
