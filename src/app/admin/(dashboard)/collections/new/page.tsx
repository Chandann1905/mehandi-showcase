import { Metadata } from "next";
import { CollectionForm } from "@/components/forms/CollectionForm";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Add Collection",
};

export default function NewCollectionPage() {
  return (
    <div className="space-y-6">
      <SectionHeading title="Add New Collection" subtitle="Create a new curated design collection" />
      <div className="bg-card p-6 rounded-xl border border-border">
        <CollectionForm />
      </div>
    </div>
  );
}
