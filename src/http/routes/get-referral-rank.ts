import { getReferralRank } from '@/app/functions/get-referral-rank'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getReferralRankRoute: FastifyPluginAsyncZod = async server => {
  server.get('/get-referral-rank', async () => await getReferralRank())
}
