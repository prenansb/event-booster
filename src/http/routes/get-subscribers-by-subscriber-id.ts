import { getSubscribersBySubscriberId } from '@/app/functions/get-subscribers-by-subscriber-id'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getSubscribersBySubscriberIdRoute: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/get-subscribers-by-subscriber-id/:subscriber_id',
      {
        schema: {
          params: z.object({
            subscriber_id: z.string(),
          }),
        },
      },
      async (request, reply) => {
        const { subscriber_id: subscriberId } = request.params

        return await getSubscribersBySubscriberId({
          subscriberId,
        })
      }
    )
  }
