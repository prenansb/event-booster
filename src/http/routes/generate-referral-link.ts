import { generateReferralLink } from '@/app/functions/generate-referral-link'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const generateReferralLinkRoute: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/generate-referral-link/:subscriber_id',
      {
        schema: {
          params: z.object({
            subscriber_id: z.string(),
          }),
        },
      },
      async (request, reply) => {
        const { subscriber_id } = request.params

        const generate = await generateReferralLink({
          subscriberId: subscriber_id,
        })

        return generate
      }
    )
  }
