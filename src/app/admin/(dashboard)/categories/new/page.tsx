import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CategoryForm } from "@/components/forms/CategoryForm";

export const metadata: Metadata = {
  title: "Add New Category",
};

export default function NewCategoryPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/categories" 
          className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Add New Category</h1>
          <p className="text-muted-foreground">Create a new collection for your mehndi designs</p>
        </div>
      </div>

      <div className="mt-8">
        <CategoryForm />
      </div>
    </div>
  );
}
