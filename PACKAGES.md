# Hassle Free Travels — Destination-Agnostic Package Engine Architecture

> [!NOTE]
> For the complete documentation covering both the **Package Engine** and the **Blog Engine**, refer to [CONTENT.md](file:///e:/Website/CONTENT.md).

The **Package Engine** enables dynamic, database-driven tour landing pages for **ANY** domestic or international destination with zero code duplication, high SEO fidelity, Schema.org rich snippets, fast static generation, and automated lead capture.

$$\text{1 Itinerary Page Template} + N \text{ Package Rows in Postgres} = N \text{ Unique, SEO-Ready Tour Pages}$$

Every destination on the website can have 0, 1, or 500 packages. There is **NO** Spiti-only template, **NO** per-destination hardcoded page, and **NO** cloned files.

**Spiti is ONLY:**
1. The UX quality and density benchmark.
2. The first seeded published package so the template is proven.
It is **NOT** a special route type.

---

## 1. Nested URL Architecture (Scales Forever)

### Destination Hub (Existing):
`/destination/[destinationSlug]`
- Examples:
  - `/destination/thailand`
  - `/destination/goa`
  - `/destination/japan`
  - `/destination/wayanad`

Lists all published packages for that destination. If there are 0 published packages, it displays the destination overview and a clean enquiry CTA without fake mock cards.

### Package / Itinerary (The Single Template):
`/destination/[destinationSlug]/[packageSlug]`
- File: `src/app/destination/[id]/[packageSlug]/page.tsx`
- Examples:
  - `/destination/thailand/bangkok-phuket-6n7d`
  - `/destination/goa/family-beach-5n6d`
  - `/destination/japan/tokyo-osaka-kyoto-8n9d`
  - `/destination/spiti/spiti-valley-tour-packages`
  - `/destination/wayanad/edakkal-wildlife-4n5d`

`generateStaticParams()` pre-renders every published package across ALL destinations:
```ts
export async function generateStaticParams() {
  const published = await db.query.packages.findMany({
    where: eq(packages.isPublished, true),
    with: { destination: true },
  });
  return published.map((p) => ({
    id: p.destination.slug,
    packageSlug: p.slug,
  }));
}
```
If `destinationSlug` does not own `packageSlug` $\rightarrow$ `notFound()`.
If the package is unpublished $\rightarrow$ `notFound()`.

### 301 Permanent Redirects to Nested Canonical URLs:
- `/india-trips/spiti-valley-tour-packages` $\xrightarrow{301}$ `/destination/spiti/spiti-valley-tour-packages`
- `/destination/spiti` $\xrightarrow{301}$ `/destination/spiti/spiti-valley-tour-packages`
- `/tours/[slug]` $\xrightarrow{301}$ `/destination/[destinationSlug]/[packageSlug]`

---

## 2. Database Schema (Drizzle ORM + PostgreSQL)

The database is built on **Neon PostgreSQL** managed with **Drizzle ORM**.

### Tables:
- `destinations`: All ~20 domestic and international destination hubs (`id`, `slug` UNIQUE, `name`, `country`, `type`, `tagline`, `overview`, `best_season`, `ideal_duration`, `hero_image`, `og_image`, `seo_title`, `seo_description`, `is_published`, `sort_order`).
- `packages`: Unlimited tour rows linked via `destination_id` with composite unique constraint `UNIQUE (destination_id, slug)`:
  - `name` (H1), `tagline`, `package_type`, `nights`, `days`, `starting_price_inr`, `price_note`, `includes_flights`
  - `group_size_min`, `group_size_max`, `departure_cities text[]`, `best_months text[]`, `highlights text[]`
  - `meals_summary`, `stay_summary`, `transport_summary`, `visa_note`
  - `hero_image`, `gallery text[]`, `seo_title`, `seo_description`, `og_image`
  - `canonical_path` (`/destination/{destSlug}/{packageSlug}`)
  - `is_published`, `is_featured`, `published_at`, `created_at`, `updated_at`
- `package_days`: Normalized day-by-day itinerary (`id`, `package_id`, `day_number`, `title`, `body`, `meals`, `stay`, `UNIQUE(package_id, day_number)`).
- `package_faqs`: Collapsible Q&A accordion items (`question`, `answer`, `sort_order`) generating `FAQPage` JSON-LD.
- `package_items`: Explicit items (`kind: 'inclusion' | 'exclusion' | 'addon'`, `label`, `sort_order`).
- `leads`: Lead capture (`destination_id`, `package_id`, `destination_slug`, `package_slug`, `pax_adults`, `pax_children`, `source`, `status`).
- `lead_notes`: Internal CRM audit logs and team follow-up notes.

---

## 3. Environment Variables (.env.local)

```env
# ─── Database ───
DATABASE_URL=postgresql://neondb_owner:...@...neon.tech/neondb?sslmode=require

# ─── Admin CMS Authentication (/admin) ───
AUTH_SECRET=your_32_character_secret_jwt_key
ADMIN_EMAIL=shivam@hasslefree-travels.com
ADMIN_PASSWORD=your_secure_admin_password

# ─── Lead Notifications ───
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
LEADS_TO_EMAIL=shivam@hasslefree-travels.com
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# ─── WhatsApp & Analytics ───
NEXT_PUBLIC_WHATSAPP_NUMBER=918375030889
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

---

## 4. Database Commands

- **Run Seed (20 destinations + Spiti benchmark + Bali draft):**
  ```bash
  npm run db:seed
  ```
- **Generate Migrations:**
  ```bash
  npm run db:generate
  ```
- **Apply Migrations:**
  ```bash
  npm run db:migrate
  ```

---

## 5. How to Add Package #2, #3, #100 in Admin (Zero Code)

1. Navigate to:
   `https://www.hasslefree-travels.com/admin` (or `http://localhost:3000/admin` locally).
2. Log in using your `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
3. In the sidebar, click **🎒 Packages**, then click **+ Create New Package** (`/admin/packages/new`).
4. Fill in the package details:
   - **Destination**: Select the relevant destination from the dropdown (e.g. *Goa*, *Thailand*, *Japan*, *Wayanad*).
   - **Package Name**: Enter the H1 title (e.g., *Family Beach & Heritage Retreat 5N/6D*).
   - **Slug**: Custom or generated slug (e.g. `family-beach-5n6d`).
   - **Duration**: Days & Nights (e.g. 6 Days / 5 Nights).
   - **Pricing**: Starting price in ₹ INR (e.g. `24999`) and price note.
   - **Logistics**: Meals summary, stay summary, transport details, visa requirements.
   - **Day-by-Day Itinerary**: Add each day's title, body, stay, and meals.
   - **Inclusions & Exclusions**: Add checklist items.
   - **Tour FAQs**: Add questions and answers.
   - **SEO Metadata**: Unique SEO title and meta description.
5. Click **Publish Live 🚀**.
6. **Result:**
   - The package is immediately live at `/destination/[destinationSlug]/[packageSlug]`.
   - The destination hub `/destination/[destinationSlug]` automatically lists the new card.
   - ISR on-demand cache revalidation refreshes the package page, the hub, and `/sitemap.xml`.
   - Google sitemap indexes the new URL automatically.
   - Zero code changes or pull requests needed.
