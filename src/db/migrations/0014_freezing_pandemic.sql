ALTER TABLE "events" ADD COLUMN "starts_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "closes_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "hosts" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN IF EXISTS "closed_at";