import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkAdminSession } from "@/lib/adminAuth";
import { db } from "@/db";
import { blogPosts, blogFaqs, destinations, packages } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (!data.title?.trim() || !data.slug?.trim() || !data.contentMd?.trim()) {
      return NextResponse.json(
        { error: "Title, slug, and content are required." },
        { status: 400 }
      );
    }

    const cleanSlug = data.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

    // Check slug collision
    const existing = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.slug, cleanSlug),
    });
    if (existing) {
      return NextResponse.json(
        { error: `A blog post with slug "${cleanSlug}" already exists.` },
        { status: 400 }
      );
    }

    // Lookup destination if destinationId is provided
    let destSlug: string | null = null;
    if (data.destinationId) {
      const dest = await db.query.destinations.findFirst({
        where: eq(destinations.id, data.destinationId),
      });
      if (dest) {
        destSlug = dest.slug;
      }
    }

    // Verify package if packageId is provided
    let validPackageId: string | null = null;
    if (data.packageId) {
      const pkg = await db.query.packages.findFirst({
        where: eq(packages.id, data.packageId),
      });
      if (pkg) {
        validPackageId = pkg.id;
      }
    }

    // Calculate reading time: ~200 words per minute
    const wordCount = data.contentMd.split(/\s+/).filter(Boolean).length;
    const computedReadMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const readMinutes = data.readMinutes ? Number(data.readMinutes) : computedReadMinutes;

    const isPublished = Boolean(data.isPublished);

    const [newPost] = await db
      .insert(blogPosts)
      .values({
        slug: cleanSlug,
        title: data.title.trim(),
        excerpt: data.excerpt?.trim() || data.title.trim(),
        contentMd: data.contentMd.trim(),
        category: data.category?.trim() || "Travel Guide",
        tags: Array.isArray(data.tags) ? data.tags : [],
        authorName: data.authorName?.trim() || "Hassle Free Travels",
        featuredImage: data.featuredImage?.trim() || "/dest-mountain.jpg",
        ogImage: data.ogImage?.trim() || data.featuredImage?.trim() || "/dest-mountain.jpg",
        seoTitle: data.seoTitle?.trim() || `${data.title.trim()} | Hassle Free Travels`,
        seoDescription: data.seoDescription?.trim() || data.excerpt?.trim() || data.title.trim(),
        destinationId: data.destinationId || null,
        packageId: validPackageId,
        destinationSlug: destSlug,
        readMinutes,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
      })
      .returning();

    // Insert FAQs if provided
    if (data.faqsList && Array.isArray(data.faqsList)) {
      for (let i = 0; i < data.faqsList.length; i++) {
        const faq = data.faqsList[i];
        if (faq.question?.trim() && faq.answer?.trim()) {
          await db.insert(blogFaqs).values({
            postId: newPost.id,
            question: faq.question.trim(),
            answer: faq.answer.trim(),
            sortOrder: i + 1,
          });
        }
      }
    }

    // Path revalidation
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${cleanSlug}`);
    revalidatePath("/sitemap.xml");
    if (destSlug) {
      revalidatePath(`/destination/${destSlug}`);
    }

    return NextResponse.json({
      success: true,
      id: newPost.id,
      slug: newPost.slug,
    });
  } catch (err: unknown) {
    console.error("Create blog post error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}
