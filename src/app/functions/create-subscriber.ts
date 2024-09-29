import { db } from '@/db'
import { events } from '@/db/schema/events'
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

  const eventExists = await db
    .select()
    .from(events)
    .where(eq(events.id, event_id))

  if (!eventExists) {
    throw new Error('This event does not exists')
  }

  const [dates] = await db
    .select({ starts: events.startsAt, ends: events.closesAt })
    .from(events)
    .where(eq(events.id, event_id))

  const { starts, ends } = dates

  const now = new Date()

  if (now < starts) {
    throw new Error('This event has not started yet.')
  }

  if (now > ends) {
    throw new Error('This event is already closed.')
  }

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
