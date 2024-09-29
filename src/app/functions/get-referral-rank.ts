import { db } from '@/db'
import { referrals } from '@/db/schema/referrals'
import { desc, sql } from 'drizzle-orm'

export async function getReferralRank() {
  const pageSize = 10 // Number of results per page
  const pageNumber = 1 // Current page number (1-based index)

  const rank = await db
    .select({
      referrerId: referrals.referrerId,
      referralCount: sql<number>`COUNT(*)`,
    })
    .from(referrals)
    .groupBy(referrals.referrerId)
    .orderBy(desc(sql`COUNT(*)`))
    .limit(pageSize)
    .offset((pageNumber - 1) * pageSize)

  return rank
}
