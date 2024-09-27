import { db } from '@/db'
import { subscribers } from '@/db/schema/subscribers'
import { referralLinkGenerator } from '@/utils/referral-link-generator'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const generateReferralLinkInput = z.object({
  subscriberId: z.string(),
  eventId: z.string(),
})

type GenerateReferralLinkInput = z.infer<typeof generateReferralLinkInput>

export async function generateReferralLink(input: GenerateReferralLinkInput) {
  const { subscriberId, eventId } = input

  const linkAlreadyExists = await db
    .select({ link: subscribers.referralLink })
    .from(subscribers)
    .where(eq(subscribers.id, subscriberId))

  if (linkAlreadyExists[0].link) {
    throw new Error('User already has a referral link.')
  }

  const referralLink = referralLinkGenerator({
    subscriberId,
    eventId,
  })

  await db
    .update(subscribers)
    .set({ referralLink })
    .where(eq(subscribers.id, subscriberId))

  return { referralLink }
}
