import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PackageForm } from "@/components/forms/PackageForm";

export const metadata: Metadata = {
  title: "Add New Package",
};

export default function NewPackagePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/packages" 
          className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Add New Package</h1>
          <p className="text-muted-foreground">Create a new pricing and service package</p>
        </div>
      </div>

      <div className="mt-8">
        <PackageForm />
      </div>
    </div>
  );
}
