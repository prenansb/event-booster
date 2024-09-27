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
    .references(() => events.id)
    .notNull(),
  ticketNumber: serial('ticket_number').notNull(),
  referralLink: text('referral_link'),
  referralLinkClicks: integer('referral_link_clicks').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
