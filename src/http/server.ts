import { env } from '@/env'
import { createSubscriberRoute } from '@/http/routes/create-subscriber'
import { eventInviteRoute } from '@/http/routes/event-invite'
import { generateReferralLinkRoute } from '@/http/routes/generate-referral-link'
import { getSubscribersBySubscriberIdRoute } from '@/http/routes/get-subscribers-by-subscriber-id'

import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export const server = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

// Routes
server.register(createSubscriberRoute)
server.register(generateReferralLinkRoute)
server.register(eventInviteRoute)
server.register(getSubscribersBySubscriberIdRoute)

const start = async () => {
  try {
    await server.listen({ port: env.PORT })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
