ALTER TABLE "subscribers" ALTER COLUMN "referral_link_clicks" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "subscribers" ALTER COLUMN "referral_link_clicks" DROP NOT NULL;