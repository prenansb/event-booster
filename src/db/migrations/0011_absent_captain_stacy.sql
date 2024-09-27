ALTER TABLE "events" DROP CONSTRAINT "events_event_subscribers_unique";--> statement-breakpoint
ALTER TABLE "events" DROP CONSTRAINT "events_event_subscribers_subscribers_id_fk";
--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "event_subscribers";