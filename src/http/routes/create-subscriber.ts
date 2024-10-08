import { createSubscriber } from '@/app/functions/create-subscriber'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createSubscriberRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/create-subscriber',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          name: z.string().min(2),
          event_id: z.string(),
        }),
        querystring: z.object({
          ref: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { email, name, event_id } = request.body
      const { ref: referral } = request.query

      const create = await createSubscriber({ email, name, event_id, referral })

      return create
    }
  )
}
