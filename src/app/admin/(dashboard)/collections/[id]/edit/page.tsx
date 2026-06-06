import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionForm } from "@/components/forms/CollectionForm";
import { collectionService } from "@/services/collection.service";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Edit Collection",
};

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const collection = await collectionService.getCollectionById(resolvedParams.id);

  if (!collection) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <SectionHeading title="Edit Collection" subtitle="Modify your curated design collection" />
      <div className="bg-card p-6 rounded-xl border border-border">
        <CollectionForm initialData={collection} />
      </div>
    </div>
  );
}
