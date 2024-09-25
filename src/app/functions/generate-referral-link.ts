import { db } from '@/db'
import { subscribers } from '@/db/schema/subscribers'
import { referralLinkGenerator } from '@/utils/referral-link-generator'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const generateReferralLinkInput = z.object({
  subscriberId: z.string(),
})

type GenerateReferralLinkInput = z.infer<typeof generateReferralLinkInput>

export async function generateReferralLink(input: GenerateReferralLinkInput) {
  const { subscriberId } = input

  try {
    const referralLink = await db
      .update(subscribers)
      .set({ referralLink: referralLinkGenerator() })
      .where(eq(subscribers.id, subscriberId))
    return referralLink
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (e: any) {
    throw new Error(e.message)
  }
}
