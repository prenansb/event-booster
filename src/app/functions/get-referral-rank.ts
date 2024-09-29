import { db } from '@/db'
import { referrals } from '@/db/schema/referrals'
import { desc, sql } from 'drizzle-orm'

export async function getReferralRank() {
  const pageSize = 10
  const pageNumber = 1

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
