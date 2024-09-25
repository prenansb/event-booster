import { env } from '@/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { schema } from './schema'

const client = new pg.Client({
  connectionString: env.DATABASE_URL,
})

await client.connect()
export const db = drizzle(client, { schema })
