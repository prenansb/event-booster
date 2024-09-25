ALTER TABLE "events" DROP CONSTRAINT "events_owner_subscribers_id_fk";
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "owner" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_owner_hosts_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
