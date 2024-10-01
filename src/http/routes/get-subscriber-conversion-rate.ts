import { getSubscriberConversionRate } from '@/app/functions/get-subscriber-conversion-rate'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getSubscriberConversionRateRoute: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/get-subscriber-conversion-rate/:subscriber_id',
      {
        schema: {
          params: z.object({
            subscriber_id: z.string(),
          }),
        },
      },
      async (request, reply) => {
        const { subscriber_id: subscriberId } = request.params

        return await getSubscriberConversionRate({
          subscriberId,
        })
      }
    )
  }
