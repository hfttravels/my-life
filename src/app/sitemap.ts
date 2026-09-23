import { MetadataRoute } from "next";
import { ALL_DESTINATIONS } from "@/data/destinations";
import { THAILAND_PACKAGES } from "@/data/thailand-packages";
import { JAPAN_PACKAGES } from "@/data/japan-packages";
import { SRI_LANKA_PACKAGES } from "@/data/sri-lanka-packages";
import { MALAYSIA_PACKAGES } from "@/data/malaysia-packages";
import { MALDIVES_PACKAGES } from "@/data/maldives-packages";
import { db } from "@/db";
import { packages, blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.hasslefree-travels.com";

  // 1. Static routes (strictly omitting /thank-you and /admin)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // 2. Destination Hub pages
  const destinationRoutes: MetadataRoute.Sitemap = Object.values(ALL_DESTINATIONS)
    .filter((dest) => dest.id !== "spiti") // Spiti canonical is at /destination/spiti/spiti-valley-tour-packages
    .map((dest) => ({
      url: `${baseUrl}/destination/${dest.id}`,
      lastModified: new Date(),
      changeFrequency: dest.trending2026 ? "daily" : "weekly",
      priority: dest.trending2026 ? 0.9 : 0.7,
    }));

  // 3. Published Tour Packages from Database
  let tourRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedTours = await db.query.packages.findMany({
      where: eq(packages.isPublished, true),
      with: {
        destination: true,
      },
    });

    tourRoutes = publishedTours.map((pkg) => ({
      url: `${baseUrl}/destination/${pkg.destination.slug}/${pkg.slug}`,
      lastModified: pkg.updatedAt || pkg.publishedAt || new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    }));
  } catch (err) {
    console.error("Failed to query tours for sitemap:", err);
  }

  // Ensure static packages (Thailand, Japan, Sri Lanka, Malaysia) are in sitemap if not in DB
  const staticDestPkgs = [
    ...THAILAND_PACKAGES.map((p) => ({ dest: "thailand", slug: p.slug })),
    ...JAPAN_PACKAGES.map((p) => ({ dest: "japan", slug: p.slug })),
    ...SRI_LANKA_PACKAGES.map((p) => ({ dest: "sri-lanka", slug: p.slug })),
    ...MALAYSIA_PACKAGES.map((p) => ({ dest: "malaysia", slug: p.slug })),
    ...MALDIVES_PACKAGES.map((p) => ({ dest: "maldives", slug: p.slug })),
  ];
  for (const sp of staticDestPkgs) {
    const url = `${baseUrl}/destination/${sp.dest}/${sp.slug}`;
    if (!tourRoutes.some((t) => t.url === url)) {
      tourRoutes.push({
        url,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      });
    }
  }

  // 4. Published Blog Articles from Database
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedBlogs = await db.query.blogPosts.findMany({
      where: eq(blogPosts.isPublished, true),
    });

    blogRoutes = publishedBlogs.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    }));
  } catch (err) {
    console.error("Failed to query blogs for sitemap:", err);
  }

  return [...staticRoutes, ...destinationRoutes, ...tourRoutes, ...blogRoutes];
}
