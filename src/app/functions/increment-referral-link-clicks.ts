import { db } from '@/db'
import { subscribers } from '@/db/schema/subscribers'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'

const incrementReferralLinkClicksInput = z.object({
  referralId: z.string(),
})

type IncrementReferralLinkClicksInput = z.infer<
  typeof incrementReferralLinkClicksInput
>

export async function incrementReferralLinkClicks(
  input: IncrementReferralLinkClicksInput
) {
  const { referralId } = input

  const [result] = await db
    .update(subscribers)
    .set({ referralLinkClicks: sql`${subscribers.referralLinkClicks} + 1` })
    .where(eq(subscribers.id, referralId))
    .returning()

  return { count: result.referralLinkClicks }
}
