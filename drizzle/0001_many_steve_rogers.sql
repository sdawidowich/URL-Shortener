ALTER TABLE "Visit" ADD COLUMN "is_bot" boolean;--> statement-breakpoint
ALTER TABLE "Visit" ADD COLUMN "device_type" text;--> statement-breakpoint
ALTER TABLE "Visit" ADD COLUMN "os" text;--> statement-breakpoint
ALTER TABLE "Visit" DROP COLUMN IF EXISTS "location";