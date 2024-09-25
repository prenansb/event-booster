ALTER TABLE "events" ALTER COLUMN "closed_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "closed_at" DROP NOT NULL;