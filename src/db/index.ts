import { env } from '@/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { schema } from './schema'

const client = new Client({
  connectionString: env.DATABASE_URL,
})

await client.connect()
export const db = drizzle(client, { schema: schema })
