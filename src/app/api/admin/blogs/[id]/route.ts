import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkAdminSession } from "@/lib/adminAuth";
import { db } from "@/db";
import { blogPosts, blogFaqs, destinations, packages } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;

  try {
    const data = await request.json();

    const existingPost = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, id),
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const cleanSlug = data.slug
      ? data.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-")
      : existingPost.slug;

    // Check slug collision if slug changed
    if (cleanSlug !== existingPost.slug) {
      const collision = await db.query.blogPosts.findFirst({
        where: eq(blogPosts.slug, cleanSlug),
      });
      if (collision && collision.id !== id) {
        return NextResponse.json(
          { error: `A blog post with slug "${cleanSlug}" already exists.` },
          { status: 400 }
        );
      }
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

    const wordCount = (data.contentMd || existingPost.contentMd)
      .split(/\s+/)
      .filter(Boolean).length;
    const computedReadMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const readMinutes = data.readMinutes ? Number(data.readMinutes) : computedReadMinutes;

    const wasPublished = existingPost.isPublished;
    const isNowPublished = Boolean(data.isPublished);

    await db
      .update(blogPosts)
      .set({
        slug: cleanSlug,
        title: data.title !== undefined ? data.title.trim() : existingPost.title,
        excerpt: data.excerpt !== undefined ? data.excerpt.trim() : existingPost.excerpt,
        contentMd: data.contentMd !== undefined ? data.contentMd.trim() : existingPost.contentMd,
        category: data.category !== undefined ? data.category.trim() : existingPost.category,
        tags: Array.isArray(data.tags) ? data.tags : existingPost.tags,
        authorName: data.authorName !== undefined ? data.authorName.trim() : existingPost.authorName,
        featuredImage: data.featuredImage !== undefined ? data.featuredImage.trim() : existingPost.featuredImage,
        ogImage: data.ogImage !== undefined ? data.ogImage.trim() : existingPost.ogImage,
        seoTitle: data.seoTitle !== undefined ? data.seoTitle.trim() : existingPost.seoTitle,
        seoDescription: data.seoDescription !== undefined ? data.seoDescription.trim() : existingPost.seoDescription,
        destinationId: data.destinationId !== undefined ? (data.destinationId || null) : existingPost.destinationId,
        packageId: data.packageId !== undefined ? validPackageId : existingPost.packageId,
        destinationSlug: destSlug !== null ? destSlug : (data.destinationId === null ? null : existingPost.destinationSlug),
        readMinutes,
        isPublished: isNowPublished,
        publishedAt: !wasPublished && isNowPublished ? new Date() : existingPost.publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id));

    // Update FAQs if faqsList provided
    if (data.faqsList && Array.isArray(data.faqsList)) {
      await db.delete(blogFaqs).where(eq(blogFaqs.postId, id));
      for (let i = 0; i < data.faqsList.length; i++) {
        const faq = data.faqsList[i];
        if (faq.question?.trim() && faq.answer?.trim()) {
          await db.insert(blogFaqs).values({
            postId: id,
            question: faq.question.trim(),
            answer: faq.answer.trim(),
            sortOrder: i + 1,
          });
        }
      }
    }

    // Revalidate paths
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${existingPost.slug}`);
    revalidatePath(`/blogs/${cleanSlug}`);
    revalidatePath("/sitemap.xml");
    if (existingPost.destinationSlug) {
      revalidatePath(`/destination/${existingPost.destinationSlug}`);
    }
    if (destSlug && destSlug !== existingPost.destinationSlug) {
      revalidatePath(`/destination/${destSlug}`);
    }

    return NextResponse.json({ success: true, slug: cleanSlug });
  } catch (err: unknown) {
    console.error("Update blog post error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;

  try {
    const existingPost = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, id),
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    await db.delete(blogPosts).where(eq(blogPosts.id, id));

    // Revalidate paths
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${existingPost.slug}`);
    revalidatePath("/sitemap.xml");
    if (existingPost.destinationSlug) {
      revalidatePath(`/destination/${existingPost.destinationSlug}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Delete blog post error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
