import { incrementReferralLinkClicks } from '@/app/functions/increment-referral-link-clicks'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const eventInviteRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/event/:eventId',
    {
      schema: {
        params: z.object({
          eventId: z.string(),
        }),
        querystring: z.object({
          ref: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { ref: referralId } = request.query

      return incrementReferralLinkClicks({ referralId })
    }
  )
}
