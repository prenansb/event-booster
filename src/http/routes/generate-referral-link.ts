import { generateReferralLink } from '@/app/functions/generate-referral-link'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const generateReferralLinkRoute: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/generate-referral-link/:event_id',
      {
        schema: {
          params: z.object({
            event_id: z.string(),
          }),
          querystring: z.object({
            subscriber_id: z.string(),
          }),
        },
      },
      async (request, reply) => {
        const { event_id: eventId } = request.params
        const { subscriber_id: subscriberId } = request.query

        const generate = await generateReferralLink({
          subscriberId,
          eventId,
        })

        return generate
      }
    )
  }
