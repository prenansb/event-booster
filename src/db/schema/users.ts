import { integer, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  ticketNumber: integer('ticket_number').notNull(),
  referralLink: text('email').notNull(),
  usersReferred: integer('amount_of_likes').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
