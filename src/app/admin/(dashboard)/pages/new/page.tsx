import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PageForm } from "@/components/forms/PageForm";

export const metadata: Metadata = {
  title: "Create New Page",
};

export default function NewPagePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/pages" 
          className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Create New Page</h1>
          <p className="text-muted-foreground">Add a new custom page to your website</p>
        </div>
      </div>

      <div className="mt-8">
        <PageForm />
      </div>
    </div>
  );
}
