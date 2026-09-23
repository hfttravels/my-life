import { requireAdminAuth } from "@/lib/adminAuth";
import { db } from "@/db";
import { destinations, packages } from "@/db/schema";
import { asc } from "drizzle-orm";
import BlogForm from "../BlogForm";

export const metadata = {
  title: "New Blog Post | Admin CMS | Hassle Free Travels",
  robots: { index: false, follow: false },
};

export default async function NewBlogPage() {
  await requireAdminAuth();

  const allDestinations = await db
    .select({ id: destinations.id, name: destinations.name, slug: destinations.slug })
    .from(destinations)
    .orderBy(asc(destinations.name));

  const allPackages = await db
    .select({
      id: packages.id,
      name: packages.name,
      slug: packages.slug,
      destinationId: packages.destinationId,
    })
    .from(packages)
    .orderBy(asc(packages.name));

  return (
    <BlogForm
      destinations={allDestinations}
      packages={allPackages}
    />
  );
}
