import { events } from '@/db/schema/events'
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const subscribers = pgTable('subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  eventId: uuid('event_id')
    .notNull()
    .unique()
    .references(() => events.id),
  ticketNumber: serial('ticket_number').notNull(),
  referredBy: uuid('referred_by'),
  referralLink: text('referral_link'),
  usersReferred: integer('users_referred').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
