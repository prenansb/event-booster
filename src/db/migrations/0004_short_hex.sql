CREATE TABLE IF NOT EXISTS "hosts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "subscribers";--> statement-breakpoint
ALTER TABLE "events" DROP CONSTRAINT "events_owner_users_id_fk";
--> statement-breakpoint
ALTER TABLE "subscribers" DROP CONSTRAINT "users_event_id_events_id_fk";
--> statement-breakpoint
ALTER TABLE "subscribers" ALTER COLUMN "event_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscribers" ALTER COLUMN "referral_link" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "referred_by" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_owner_subscribers_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."subscribers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
