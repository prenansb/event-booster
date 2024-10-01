import { db } from '@/db'
import { referrals } from '@/db/schema/referrals'
import { subscribers } from '@/db/schema/subscribers'
import { count, eq } from 'drizzle-orm'
import { z } from 'zod'

const getSubscriberConversionRateInput = z.object({
  subscriberId: z.string(),
})

type GetSubscriberConversionRateInput = z.infer<
  typeof getSubscriberConversionRateInput
>

export async function getSubscriberConversionRate(
  input: GetSubscriberConversionRateInput
) {
  const { subscriberId } = getSubscriberConversionRateInput.parse(input)

  const subscriberExists = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.id, subscriberId))

  if (subscriberExists.length < 1) {
    throw new Error('Subscriber does not exist.')
  }

  const [linkClicks] = await db
    .select({ clicks: subscribers.referralLinkClicks })
    .from(subscribers)
    .where(eq(subscribers.id, subscriberId))

  if (linkClicks.clicks < 1) {
    throw new Error('This subscriber has no link clicks.')
  }

  const [referreds] = await db
    .select({ count: count() })
    .from(referrals)
    .where(eq(referrals.referrerId, subscriberId))

  if (referreds.count < 1) {
    throw new Error('This subscriber has not referred anyone.')
  }

  return { conversionRate: referreds.count / linkClicks.clicks }
}
