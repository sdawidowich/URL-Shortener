CREATE TABLE IF NOT EXISTS "Url" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"created_by" varchar(32) NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Visit" (
	"id" serial PRIMARY KEY NOT NULL,
	"url_id" text NOT NULL,
	"accessed_on" timestamp,
	"browser" text,
	"location" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Url" ADD CONSTRAINT "Url_created_by_User_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Visit" ADD CONSTRAINT "Visit_url_id_Url_id_fk" FOREIGN KEY ("url_id") REFERENCES "public"."Url"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
