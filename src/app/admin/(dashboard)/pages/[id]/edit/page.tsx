import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { PageForm } from "@/components/forms/PageForm";
import { pageService } from "@/services/page.service";

export const metadata: Metadata = {
  title: "Edit Page",
};

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await pageService.getPageById(id);

  if (!page) {
    notFound();
  }

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
          <h1 className="text-3xl font-heading font-bold text-foreground">Edit Page</h1>
          <p className="text-muted-foreground">Update your custom page content</p>
        </div>
      </div>

      <div className="mt-8">
        <PageForm initialData={page} isEdit />
      </div>
    </div>
  );
}
