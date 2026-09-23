import { requireAdminAuth } from "@/lib/adminAuth";
import { db } from "@/db";
import { destinations } from "@/db/schema";
import { asc } from "drizzle-orm";
import PackageForm from "../PackageForm";

export default async function NewPackagePage() {
  await requireAdminAuth();

  const allDestinations = await db
    .select({ id: destinations.id, name: destinations.name, slug: destinations.slug })
    .from(destinations)
    .orderBy(asc(destinations.name));

  return (
    <div>
      <PackageForm destinations={allDestinations} isEdit={false} />
    </div>
  );
}
