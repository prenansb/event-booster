import { db } from '@/db'
import { subscribers } from '@/db/schema/subscribers'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const createSubscriberInput = z.object({
  email: z.string().email(),
  name: z.string(),
  event_id: z.string(),
})

type CreateSubscriberInput = z.infer<typeof createSubscriberInput>

export async function createSubscriber(input: CreateSubscriberInput) {
  const { email, name, event_id } = input

  const emailAlreadyExist = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.email, email))

  if (emailAlreadyExist.length > 0) {
    return
  }

  return await db.insert(subscribers).values({ email, name, eventId: event_id })
}
