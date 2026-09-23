import { Metadata } from "next";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import BlogsClient, { DbBlogPost } from "./BlogsClient";

export const metadata: Metadata = {
  title: "Travel Blog | Hassle Free Travels — Stories, Guides & Travel Inspiration",
  description:
    "Explore curated travel guides, destination tips, packing checklists, and insider stories from our community of travelers. Verified local stays & expert advice.",
  alternates: {
    canonical: "https://www.hasslefree-travels.com/blogs",
  },
  openGraph: {
    title: "Travel Blog | Hassle Free Travels",
    description:
      "Explore curated travel guides, destination tips, and insider stories from our community of travelers.",
    url: "https://www.hasslefree-travels.com/blogs",
    type: "website",
  },
};

export default async function BlogsPage() {
  const posts = await db.query.blogPosts.findMany({
    where: eq(blogPosts.isPublished, true),
    with: {
      destination: true,
    },
    orderBy: [desc(blogPosts.publishedAt)],
  });

  const formattedPosts: DbBlogPost[] = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category || "Travel Guides",
    image: p.featuredImage || "/dest-mountain.jpg",
    author: p.authorName,
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Recently Added",
    readTime: `${p.readMinutes} min read`,
    tags: p.tags || [],
    destinationName: p.destination?.name || null,
    destinationSlug: p.destination?.slug || null,
  }));

  return <BlogsClient posts={formattedPosts} />;
}
