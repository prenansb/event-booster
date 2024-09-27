import { db } from '@/db'
import { referrals } from '@/db/schema/referrals'
import { count, eq } from 'drizzle-orm'
import { z } from 'zod'

const getSubscribersBySubscriberIdInput = z.object({
  subscriberId: z.string(),
})

type GetSubscribersBySubscriberIdInput = z.infer<
  typeof getSubscribersBySubscriberIdInput
>

export async function getSubscribersBySubscriberId(
  input: GetSubscribersBySubscriberIdInput
) {
  const { subscriberId } = getSubscribersBySubscriberIdInput.parse(input)

  const [referredCount] = await db
    .select({ count: count() })
    .from(referrals)
    .where(eq(referrals.referrerId, subscriberId))

  return referredCount
}
