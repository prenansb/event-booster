import { env } from '@/env'
import { createSubscriberRoute } from '@/http/routes/create-subscriber'

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

server.register(createSubscriberRoute)

const start = async () => {
  try {
    await server.listen({ port: env.PORT })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
