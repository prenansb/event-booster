import { hosts } from '@/db/schema/hosts'
import { events } from './events'
import { subscribers } from './subscribers'

export const schema = {
  subscribers,
  events,
  hosts,
}
