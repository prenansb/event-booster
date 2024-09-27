import { subscribers } from '@/db/schema/subscribers'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

export const referrals = pgTable(
  'referrals',
  {
    referrerId: uuid('referrer_id')
      .notNull()
      .references(() => subscribers.id),
    referredId: uuid('referred_id')
      .notNull()
      .references(() => subscribers.id),
  },
  table => {
    return {
      pk: primaryKey({ columns: [table.referrerId, table.referredId] }),
    }
  }
)
