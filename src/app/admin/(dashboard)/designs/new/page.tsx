import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { DesignForm } from "@/components/forms/DesignForm";
import { categoryService } from "@/services/category.service";

export const metadata: Metadata = {
  title: "Add New Design",
};

export default async function NewDesignPage() {
  const categories = await categoryService.getCategories();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/designs" 
          className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Add New Design</h1>
          <p className="text-muted-foreground">Upload a new mehndi design to your portfolio</p>
        </div>
      </div>

      <div className="mt-8">
        <DesignForm categories={categories} />
      </div>
    </div>
  );
}
