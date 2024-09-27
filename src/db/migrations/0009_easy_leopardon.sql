ALTER TABLE "subscribers" DROP CONSTRAINT "subscribers_event_id_unique";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "event_subscribers" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_event_subscribers_subscribers_id_fk" FOREIGN KEY ("event_subscribers") REFERENCES "public"."subscribers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_event_subscribers_unique" UNIQUE("event_subscribers");