CREATE TABLE IF NOT EXISTS "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(16),
	"examples" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"student_id" varchar(8) PRIMARY KEY NOT NULL,
	"first_name" varchar(45) NOT NULL,
	"last_name" varchar(45) NOT NULL,
	"course" varchar(100) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"discord" varchar(32) NOT NULL,
	"join_reason" text,
	"proof_of_payment" varchar(255) NOT NULL,
	"fav_husbando_waifu" varchar(32) NOT NULL,
	"registeration_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "member_interested_activities" (
	"student_id" varchar NOT NULL,
	"activity_id" integer NOT NULL,
	CONSTRAINT "member_interested_activities_student_id_activity_id_pk" PRIMARY KEY("student_id","activity_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "student_id_idx" ON "members" ("student_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member_interested_activities" ADD CONSTRAINT "member_interested_activities_student_id_members_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "members"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member_interested_activities" ADD CONSTRAINT "member_interested_activities_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
