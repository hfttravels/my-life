import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Destinations ───
export const destinations = pgTable("destinations", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  country: text("country"),
  type: text("type").notNull(), // 'international' | 'domestic'
  tagline: text("tagline"),
  overview: text("overview"),
  best_season: text("best_season"),
  ideal_duration: text("ideal_duration"),
  hero_image: text("hero_image"),
  og_image: text("og_image"),
  seo_title: text("seo_title"),
  seo_description: text("seo_description"),
  is_published: boolean("is_published").default(true).notNull(),
  sort_order: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Packages ───
export const packages = pgTable(
  "packages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    destinationId: uuid("destination_id")
      .notNull()
      .references(() => destinations.id, { onDelete: "restrict" }),
    slug: text("slug").notNull(),
    name: text("name").notNull(), // H1
    tagline: text("tagline"),
    packageType: text("package_type").notNull(), // 'group' | 'custom' | 'honeymoon' | 'family' | 'adventure' | 'spiritual'
    nights: integer("nights").notNull(),
    days: integer("days").notNull(),
    startingPriceInr: integer("starting_price_inr"), // nullable if enquire-only
    priceNote: text("price_note"), // "per person, twin share, ex-Delhi, without flights"
    includesFlights: boolean("includes_flights").default(false).notNull(),
    groupSizeMin: integer("group_size_min"),
    groupSizeMax: integer("group_size_max"),
    departureCities: text("departure_cities").array(), // e.g. {Delhi, Mumbai, Chandigarh}
    bestMonths: text("best_months").array(),
    highlights: text("highlights").array(),
    mealsSummary: text("meals_summary"),
    staySummary: text("stay_summary"),
    transportSummary: text("transport_summary"),
    visaNote: text("visa_note"),
    heroImage: text("hero_image").notNull(),
    gallery: text("gallery").array(),
    seoTitle: text("seo_title").notNull(),
    seoDescription: text("seo_description").notNull(),
    ogImage: text("og_image"),
    canonicalPath: text("canonical_path"), // /destination/{destSlug}/{packageSlug}
    isPublished: boolean("is_published").default(false).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    unique("unique_destination_package_slug").on(table.destinationId, table.slug),
  ]
);

// ─── Package Days (Day-by-Day Itinerary) ───
export const packageDays = pgTable(
  "package_days",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    packageId: uuid("package_id")
      .notNull()
      .references(() => packages.id, { onDelete: "cascade" }),
    dayNumber: integer("day_number").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    meals: text("meals"),
    stay: text("stay"),
  },
  (table) => [
    unique("unique_package_day").on(table.packageId, table.dayNumber),
  ]
);

// ─── Package FAQs ───
export const packageFaqs = pgTable("package_faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  packageId: uuid("package_id")
    .notNull()
    .references(() => packages.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

// ─── Package Items (Inclusions, Exclusions, Addons) ───
export const packageItems = pgTable("package_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  packageId: uuid("package_id")
    .notNull()
    .references(() => packages.id, { onDelete: "cascade" }),
  kind: text("kind").notNull(), // 'inclusion' | 'exclusion' | 'addon'
  label: text("label").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

// ─── Leads ───
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  destinationId: uuid("destination_id").references(() => destinations.id, {
    onDelete: "set null",
  }),
  packageId: uuid("package_id").references(() => packages.id, {
    onDelete: "set null",
  }),
  packageSlug: text("package_slug"),
  destinationSlug: text("destination_slug"),
  travelDate: text("travel_date"),
  paxAdults: integer("pax_adults"),
  paxChildren: integer("pax_children"),
  tripType: text("trip_type"), // 'group' | 'custom' | 'unknown'
  message: text("message"),
  source: text("source"), // 'package_page' | 'destination' | 'whatsapp' | 'newsletter' | 'instagram' | 'other'
  sourcePage: text("source_page"),
  status: text("status").default("new").notNull(), // 'new' | 'contacted' | 'hot' | 'follow_up' | 'quoted' | 'won' | 'lost'
  followUpAt: timestamp("follow_up_at", { withTimezone: true }),
  notes: text("notes"),

  // Extended Lead Intelligence Fields
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  visitorId: text("visitor_id"),
  sessionId: text("session_id"),
  ipHash: text("ip_hash"),
  departureCity: text("departure_city"),
  budget: text("budget"),
  durationPreference: text("duration_preference"),
  accommodationPreference: text("accommodation_preference"),
  customRequirements: text("custom_requirements"),
  assignedTo: text("assigned_to"),
  priority: text("priority").default("medium").notNull(), // 'low' | 'medium' | 'high' | 'urgent'
  leadScore: integer("lead_score").default(0).notNull(),
  leadGrade: text("lead_grade").default("cold").notNull(), // 'hot' | 'warm' | 'cold'
  pipelineStage: text("pipeline_stage").default("new").notNull(), // 'new' | 'contacted' | 'requirement_gathered' | 'itinerary_sent' | 'negotiation' | 'won' | 'lost' | 'dormant'
  lostReason: text("lost_reason"),
  estimatedRevenue: integer("estimated_revenue"),
  actualRevenue: integer("actual_revenue"),
  communicationPreference: text("communication_preference").default("whatsapp").notNull(), // 'whatsapp' | 'email' | 'phone'
  consentMarketing: boolean("consent_marketing").default(false).notNull(),
  consentData: boolean("consent_data").default(true).notNull(),
});

// ─── Lead Notes ───
export const leadNotes = pgTable("lead_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Visitors (First-Party Identity & Fingerprinting) ───
export const visitors = pgTable("visitors", {
  id: uuid("id").primaryKey().defaultRandom(),
  visitorId: text("visitor_id").notNull().unique(),
  firstSeenAt: timestamp("first_seen_at", { withTimezone: true }).defaultNow().notNull(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).defaultNow().notNull(),
  firstPage: text("first_page"),
  firstReferrer: text("first_referrer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  deviceType: text("device_type"), // 'desktop' | 'mobile' | 'tablet'
  browser: text("browser"),
  os: text("os"),
  country: text("country"),
  city: text("city"),
  ipHash: text("ip_hash"),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
  metadata: text("metadata"),
});

// ─── Sessions (Visit Sessions) ───
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull().unique(),
  visitorId: text("visitor_id").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  pageViewsCount: integer("page_views_count").default(1).notNull(),
  durationSeconds: integer("duration_seconds").default(0).notNull(),
  landingPage: text("landing_page"),
  exitPage: text("exit_page"),
  referrer: text("referrer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  deviceType: text("device_type"),
  converted: boolean("converted").default(false).notNull(),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
});

// ─── Page Views ───
export const pageViews = pgTable("page_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull(),
  visitorId: text("visitor_id").notNull(),
  path: text("path").notNull(),
  title: text("title"),
  referrer: text("referrer"),
  viewedAt: timestamp("viewed_at", { withTimezone: true }).defaultNow().notNull(),
  timeOnPage: integer("time_on_page").default(0).notNull(),
  scrollDepth: integer("scroll_depth").default(0).notNull(),
});

// ─── Analytics Events (High-Intent Actions) ───
export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull(),
  visitorId: text("visitor_id").notNull(),
  eventType: text("event_type").notNull(), // 'cta_click' | 'form_start' | 'form_submit' | 'whatsapp_click' | 'package_view' | 'scroll_depth' | 'filter_click'
  eventName: text("event_name").notNull(),
  path: text("path").notNull(),
  properties: text("properties"), // JSON string
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Lead Scores (AI & Rule-based Lead Intelligence) ───
export const leadScores = pgTable("lead_scores", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  score: integer("score").default(0).notNull(),
  grade: text("grade").default("cold").notNull(), // 'hot' | 'warm' | 'cold'
  engagementScore: integer("engagement_score").default(0).notNull(),
  intentScore: integer("intent_score").default(0).notNull(),
  fitScore: integer("fit_score").default(0).notNull(),
  budgetScore: integer("budget_score").default(0).notNull(),
  urgencyScore: integer("urgency_score").default(0).notNull(),
  breakdownJson: text("breakdown_json"),
  aiSummary: text("ai_summary"),
  recommendedAction: text("recommended_action"),
  calculatedAt: timestamp("calculated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Lead Activities (Complete Audit & Action History) ───
export const leadActivities = pgTable("lead_activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  activityType: text("activity_type").notNull(), // 'status_change' | 'stage_change' | 'note_added' | 'email_sent' | 'whatsapp_sent' | 'call_logged' | 'quote_sent' | 'payment_recorded' | 'form_submitted' | 'score_updated'
  title: text("title").notNull(),
  description: text("description"),
  metadata: text("metadata"),
  performedBy: text("performed_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Blog Posts ───
export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(), // H1
  excerpt: text("excerpt").notNull(),
  contentMd: text("content_md").notNull(),
  category: text("category"),
  tags: text("tags").array(),
  authorName: text("author_name").default("Hassle Free Travels").notNull(),
  featuredImage: text("featured_image"),
  ogImage: text("og_image"),
  seoTitle: text("seo_title").notNull(),
  seoDescription: text("seo_description").notNull(),
  destinationId: uuid("destination_id").references(() => destinations.id, {
    onDelete: "set null",
  }),
  packageId: uuid("package_id").references(() => packages.id, {
    onDelete: "set null",
  }),
  destinationSlug: text("destination_slug"),
  readMinutes: integer("read_minutes").default(5).notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Blog FAQs ───
export const blogFaqs = pgTable("blog_faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id")
    .notNull()
    .references(() => blogPosts.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

// ─── Drizzle Relations ───
export const destinationsRelations = relations(destinations, ({ many }) => ({
  packages: many(packages),
  leads: many(leads),
  blogPosts: many(blogPosts),
}));

export const packagesRelations = relations(packages, ({ one, many }) => ({
  destination: one(destinations, {
    fields: [packages.destinationId],
    references: [destinations.id],
  }),
  itineraryDays: many(packageDays),
  faqs: many(packageFaqs),
  items: many(packageItems),
  leads: many(leads),
  blogPosts: many(blogPosts),
}));

export const packageDaysRelations = relations(packageDays, ({ one }) => ({
  package: one(packages, {
    fields: [packageDays.packageId],
    references: [packages.id],
  }),
}));

export const packageFaqsRelations = relations(packageFaqs, ({ one }) => ({
  package: one(packages, {
    fields: [packageFaqs.packageId],
    references: [packages.id],
  }),
}));

export const packageItemsRelations = relations(packageItems, ({ one }) => ({
  package: one(packages, {
    fields: [packageItems.packageId],
    references: [packages.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one, many }) => ({
  destination: one(destinations, {
    fields: [leads.destinationId],
    references: [destinations.id],
  }),
  package: one(packages, {
    fields: [leads.packageId],
    references: [packages.id],
  }),
  notes: many(leadNotes),
  scores: many(leadScores),
  activities: many(leadActivities),
}));

export const leadNotesRelations = relations(leadNotes, ({ one }) => ({
  lead: one(leads, {
    fields: [leadNotes.leadId],
    references: [leads.id],
  }),
}));

export const visitorsRelations = relations(visitors, ({ one }) => ({
  lead: one(leads, {
    fields: [visitors.leadId],
    references: [leads.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  lead: one(leads, {
    fields: [sessions.leadId],
    references: [leads.id],
  }),
}));

export const leadScoresRelations = relations(leadScores, ({ one }) => ({
  lead: one(leads, {
    fields: [leadScores.leadId],
    references: [leads.id],
  }),
}));

export const leadActivitiesRelations = relations(leadActivities, ({ one }) => ({
  lead: one(leads, {
    fields: [leadActivities.leadId],
    references: [leads.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  destination: one(destinations, {
    fields: [blogPosts.destinationId],
    references: [destinations.id],
  }),
  package: one(packages, {
    fields: [blogPosts.packageId],
    references: [packages.id],
  }),
  faqs: many(blogFaqs),
}));

export const blogFaqsRelations = relations(blogFaqs, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogFaqs.postId],
    references: [blogPosts.id],
  }),
}));

export type Destination = typeof destinations.$inferSelect;
export type NewDestination = typeof destinations.$inferInsert;
export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
export type PackageDay = typeof packageDays.$inferSelect;
export type NewPackageDay = typeof packageDays.$inferInsert;
export type PackageFaq = typeof packageFaqs.$inferSelect;
export type NewPackageFaq = typeof packageFaqs.$inferInsert;
export type PackageItem = typeof packageItems.$inferSelect;
export type NewPackageItem = typeof packageItems.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type LeadNote = typeof leadNotes.$inferSelect;
export type NewLeadNote = typeof leadNotes.$inferInsert;
export type Visitor = typeof visitors.$inferSelect;
export type NewVisitor = typeof visitors.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type PageView = typeof pageViews.$inferSelect;
export type NewPageView = typeof pageViews.$inferInsert;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;
export type LeadScore = typeof leadScores.$inferSelect;
export type NewLeadScore = typeof leadScores.$inferInsert;
export type LeadActivity = typeof leadActivities.$inferSelect;
export type NewLeadActivity = typeof leadActivities.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type BlogFaq = typeof blogFaqs.$inferSelect;
export type NewBlogFaq = typeof blogFaqs.$inferInsert;
