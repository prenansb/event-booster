import { env } from '@/env'
import type { Config } from 'drizzle-kit'

export default {
  schema: 'src/db/schema/*',
  out: 'src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL },
} satisfies Config
