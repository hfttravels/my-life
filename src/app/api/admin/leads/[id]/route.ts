import { NextRequest, NextResponse } from "next/server";
import { checkAdminSession } from "@/lib/adminAuth";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;

  try {
    const { status, notes } = await request.json();

    await db
      .update(leads)
      .set({
        ...(status ? { status } : {}),
        ...(notes !== undefined ? { notes } : {}),
        updatedAt: new Date(),
      })
      .where(eq(leads.id, id));

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Update lead error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to update lead" },
      { status: 500 }
    );
  }
}
