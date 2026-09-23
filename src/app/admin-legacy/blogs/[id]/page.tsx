import { notFound } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { db } from "@/db";
import { blogPosts, destinations, packages, blogFaqs } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import BlogForm from "../BlogForm";

export const metadata = {
  title: "Edit Blog Post | Admin CMS | Hassle Free Travels",
  robots: { index: false, follow: false },
};

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  await requireAdminAuth();

  const { id } = await params;

  const post = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.id, id),
    with: {
      faqs: {
        orderBy: [asc(blogFaqs.sortOrder)],
      },
    },
  });

  if (!post) {
    notFound();
  }

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

  const initialData = {
    id: post.id,
    destinationId: post.destinationId,
    packageId: post.packageId,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    contentMd: post.contentMd,
    category: post.category || "Travel Guide",
    tags: post.tags || [],
    authorName: post.authorName,
    featuredImage: post.featuredImage || "/dest-mountain.jpg",
    ogImage: post.ogImage || post.featuredImage || "/dest-mountain.jpg",
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    readMinutes: post.readMinutes,
    isPublished: post.isPublished,
    faqsList: post.faqs.map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  };

  return (
    <BlogForm
      initialData={initialData}
      destinations={allDestinations}
      packages={allPackages}
      isEdit={true}
    />
  );
}
