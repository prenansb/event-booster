import { db } from '@/db'
import { referrals } from '@/db/schema/referrals'
import { subscribers } from '@/db/schema/subscribers'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const createSubscriberInput = z.object({
  email: z.string().email(),
  name: z.string(),
  event_id: z.string(),
  referral: z.string().optional(),
})

type CreateSubscriberInput = z.infer<typeof createSubscriberInput>

export async function createSubscriber(input: CreateSubscriberInput) {
  const { email, name, event_id, referral } = createSubscriberInput.parse(input)

  const emailAlreadyExists = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.email, email))

  if (emailAlreadyExists.length > 0) {
    throw new Error('Email already subscribed.')
  }

  const [newSubscriber] = await db
    .insert(subscribers)
    .values({ email, name, eventId: event_id })
    .returning()

  if (referral) {
    await db
      .insert(referrals)
      .values({ referrerId: referral, referredId: newSubscriber.id })
  }

  return 'Subscribed!'
}
