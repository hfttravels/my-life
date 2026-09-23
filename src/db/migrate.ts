import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("❌ DATABASE_URL is not set in .env.local");
    process.exit(1);
  }

  const sql = neon(connectionString);
  console.log("🚀 Starting database migration...");

  try {
    // 1. Rename any legacy tables & constraints
    try {
      await sql.query(`ALTER INDEX IF EXISTS packages_slug_unique RENAME TO _legacy_packages_slug_unique;`);
    } catch {}
    try {
      await sql.query(`ALTER INDEX IF EXISTS packages_pkey RENAME TO _legacy_packages_pkey;`);
    } catch {}
    try {
      await sql.query(`ALTER INDEX IF EXISTS leads_pkey RENAME TO _legacy_leads_pkey;`);
    } catch {}

    const checkPackages = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'packages' AND column_name = 'duration_days';
    `;
    if (checkPackages.length > 0) {
      console.log("📦 Archiving legacy packages table to _legacy_packages...");
      await sql.query(`ALTER TABLE IF EXISTS packages RENAME TO _legacy_packages;`);
    }

    const checkLeads = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'stage';
    `;
    if (checkLeads.length > 0) {
      console.log("📦 Archiving legacy leads table to _legacy_leads...");
      await sql.query(`ALTER TABLE IF EXISTS leads RENAME TO _legacy_leads;`);
    }

    // 2. Create tables
    console.log("🔨 Creating tables...");

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "destinations" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "slug" text NOT NULL UNIQUE,
        "name" text NOT NULL,
        "country" text,
        "type" text NOT NULL,
        "tagline" text,
        "overview" text,
        "best_season" text,
        "ideal_duration" text,
        "hero_image" text,
        "og_image" text,
        "seo_title" text,
        "seo_description" text,
        "is_published" boolean DEFAULT true NOT NULL,
        "sort_order" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "packages" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "destination_id" uuid NOT NULL,
        "slug" text NOT NULL UNIQUE,
        "name" text NOT NULL,
        "tagline" text,
        "package_type" text NOT NULL,
        "nights" integer NOT NULL,
        "days" integer NOT NULL,
        "starting_price_inr" integer,
        "price_note" text,
        "includes_flights" boolean DEFAULT false NOT NULL,
        "group_size_min" integer,
        "group_size_max" integer,
        "departure_cities" text[],
        "best_months" text[],
        "highlights" text[],
        "meals_summary" text,
        "stay_summary" text,
        "transport_summary" text,
        "visa_note" text,
        "hero_image" text NOT NULL,
        "gallery" text[],
        "seo_title" text NOT NULL,
        "seo_description" text NOT NULL,
        "og_image" text,
        "canonical_path" text,
        "is_published" boolean DEFAULT false NOT NULL,
        "is_featured" boolean DEFAULT false NOT NULL,
        "published_at" timestamp with time zone,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "package_days" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "package_id" uuid NOT NULL,
        "day_number" integer NOT NULL,
        "title" text NOT NULL,
        "body" text NOT NULL,
        "meals" text,
        "stay" text,
        CONSTRAINT "unique_package_day" UNIQUE("package_id","day_number")
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "package_faqs" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "package_id" uuid NOT NULL,
        "question" text NOT NULL,
        "answer" text NOT NULL,
        "sort_order" integer DEFAULT 0 NOT NULL
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "package_items" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "package_id" uuid NOT NULL,
        "kind" text NOT NULL,
        "label" text NOT NULL,
        "sort_order" integer DEFAULT 0 NOT NULL
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "leads" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        "name" text NOT NULL,
        "phone" text NOT NULL,
        "email" text,
        "destination_id" uuid,
        "package_id" uuid,
        "package_slug" text,
        "destination_slug" text,
        "travel_date" text,
        "pax_adults" integer,
        "pax_children" integer,
        "trip_type" text,
        "message" text,
        "source" text,
        "source_page" text,
        "status" text DEFAULT 'new' NOT NULL,
        "follow_up_at" timestamp with time zone,
        "notes" text
      );
    `);

    // Add new columns to leads if they do not exist
    const leadColumnsToAdd = [
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_source" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_medium" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_campaign" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_term" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_content" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "visitor_id" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "session_id" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "ip_hash" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "departure_city" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "budget" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "duration_preference" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "accommodation_preference" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "custom_requirements" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "assigned_to" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "priority" text DEFAULT 'medium' NOT NULL;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "lead_score" integer DEFAULT 0 NOT NULL;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "lead_grade" text DEFAULT 'cold' NOT NULL;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "pipeline_stage" text DEFAULT 'new' NOT NULL;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "lost_reason" text;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "estimated_revenue" integer;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "actual_revenue" integer;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "communication_preference" text DEFAULT 'whatsapp' NOT NULL;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "consent_marketing" boolean DEFAULT false NOT NULL;`,
      `ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "consent_data" boolean DEFAULT true NOT NULL;`,
    ];
    for (const colDdl of leadColumnsToAdd) {
      await sql.query(colDdl);
    }

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "lead_notes" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "lead_id" uuid NOT NULL,
        "body" text NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    // ─── Analytics & Visitor Intelligence Tables ───
    await sql.query(`
      CREATE TABLE IF NOT EXISTS "visitors" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "visitor_id" text NOT NULL UNIQUE,
        "first_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
        "last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
        "first_page" text,
        "first_referrer" text,
        "utm_source" text,
        "utm_medium" text,
        "utm_campaign" text,
        "utm_term" text,
        "utm_content" text,
        "device_type" text,
        "browser" text,
        "os" text,
        "country" text,
        "city" text,
        "ip_hash" text,
        "lead_id" uuid,
        "metadata" text
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "session_id" text NOT NULL UNIQUE,
        "visitor_id" text NOT NULL,
        "started_at" timestamp with time zone DEFAULT now() NOT NULL,
        "ended_at" timestamp with time zone,
        "page_views_count" integer DEFAULT 1 NOT NULL,
        "duration_seconds" integer DEFAULT 0 NOT NULL,
        "landing_page" text,
        "exit_page" text,
        "referrer" text,
        "utm_source" text,
        "utm_medium" text,
        "utm_campaign" text,
        "utm_term" text,
        "utm_content" text,
        "device_type" text,
        "converted" boolean DEFAULT false NOT NULL,
        "lead_id" uuid
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "page_views" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "session_id" text NOT NULL,
        "visitor_id" text NOT NULL,
        "path" text NOT NULL,
        "title" text,
        "referrer" text,
        "viewed_at" timestamp with time zone DEFAULT now() NOT NULL,
        "time_on_page" integer DEFAULT 0 NOT NULL,
        "scroll_depth" integer DEFAULT 0 NOT NULL
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "analytics_events" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "session_id" text NOT NULL,
        "visitor_id" text NOT NULL,
        "event_type" text NOT NULL,
        "event_name" text NOT NULL,
        "path" text NOT NULL,
        "properties" text,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "lead_scores" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "lead_id" uuid NOT NULL,
        "score" integer DEFAULT 0 NOT NULL,
        "grade" text DEFAULT 'cold' NOT NULL,
        "engagement_score" integer DEFAULT 0 NOT NULL,
        "intent_score" integer DEFAULT 0 NOT NULL,
        "fit_score" integer DEFAULT 0 NOT NULL,
        "budget_score" integer DEFAULT 0 NOT NULL,
        "urgency_score" integer DEFAULT 0 NOT NULL,
        "breakdown_json" text,
        "ai_summary" text,
        "recommended_action" text,
        "calculated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await sql.query(`
      CREATE TABLE IF NOT EXISTS "lead_activities" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "lead_id" uuid NOT NULL,
        "activity_type" text NOT NULL,
        "title" text NOT NULL,
        "description" text,
        "metadata" text,
        "performed_by" text,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    // 3. Add foreign key constraints safely
    console.log("🔗 Ensuring foreign key relationships...");
    const constraints = [
      `ALTER TABLE "packages" ADD CONSTRAINT "packages_destination_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE restrict;`,
      `ALTER TABLE "package_days" ADD CONSTRAINT "package_days_package_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade;`,
      `ALTER TABLE "package_faqs" ADD CONSTRAINT "package_faqs_package_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade;`,
      `ALTER TABLE "package_items" ADD CONSTRAINT "package_items_package_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade;`,
      `ALTER TABLE "leads" ADD CONSTRAINT "leads_destination_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null;`,
      `ALTER TABLE "leads" ADD CONSTRAINT "leads_package_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE set null;`,
      `ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade;`,
      `ALTER TABLE "visitors" ADD CONSTRAINT "visitors_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE set null;`,
      `ALTER TABLE "sessions" ADD CONSTRAINT "sessions_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE set null;`,
      `ALTER TABLE "lead_scores" ADD CONSTRAINT "lead_scores_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade;`,
      `ALTER TABLE "lead_activities" ADD CONSTRAINT "lead_activities_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade;`,
    ];

    for (const ddl of constraints) {
      try {
        await sql.query(ddl);
      } catch (err: unknown) {
        // Ignore if constraint already exists (code 42710)
        const pgErr = err as { code?: string };
        if (pgErr?.code !== "42710") {
          console.warn("Notice on constraint:", (err as Error).message);
        }
      }
    }

    // 4. Performance Indexes
    console.log("⚡ Creating performance indexes...");
    const indexes = [
      `CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);`,
      `CREATE INDEX IF NOT EXISTS idx_leads_pipeline_stage ON leads (pipeline_stage);`,
      `CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);`,
      `CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone);`,
      `CREATE INDEX IF NOT EXISTS idx_leads_visitor_id ON leads (visitor_id);`,
      `CREATE INDEX IF NOT EXISTS idx_visitors_visitor_id ON visitors (visitor_id);`,
      `CREATE INDEX IF NOT EXISTS idx_sessions_visitor_id ON sessions (visitor_id);`,
      `CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions (session_id);`,
      `CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views (path);`,
      `CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views (session_id);`,
      `CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events (event_type);`,
      `CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events (created_at DESC);`,
      `CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities (lead_id);`,
      `CREATE INDEX IF NOT EXISTS idx_lead_scores_lead_id ON lead_scores (lead_id);`,
    ];

    for (const idxDdl of indexes) {
      try {
        await sql.query(idxDdl);
      } catch (err: unknown) {
        console.warn("Notice on index:", (err as Error).message);
      }
    }

    console.log("✅ Database migration completed successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

runMigration();
