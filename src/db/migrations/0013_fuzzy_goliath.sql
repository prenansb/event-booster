CREATE TABLE IF NOT EXISTS "referrals" (
	"referrer_id" uuid NOT NULL,
	"referred_id" uuid NOT NULL,
	CONSTRAINT "referrals_referrer_id_referred_id_pk" PRIMARY KEY("referrer_id","referred_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrer_id_subscribers_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "public"."subscribers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referred_id_subscribers_id_fk" FOREIGN KEY ("referred_id") REFERENCES "public"."subscribers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "subscribers" DROP COLUMN IF EXISTS "referred_by";--> statement-breakpoint
ALTER TABLE "subscribers" DROP COLUMN IF EXISTS "users_referred";