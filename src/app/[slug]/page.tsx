import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicLayout } from "@/components/layout";
import { pageService } from "@/services/page.service";

export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await pageService.getPage(resolvedParams.slug);
  
  if (!page || !page.published) return { title: "Page Not Found" };
  
  return {
    title: page.title,
    // Add openGraph data or other SEO metadata if available on the page schema
  };
}

export default async function CMSPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const page = await pageService.getPage(resolvedParams.slug);

  if (!page || !page.published) {
    notFound();
  }

  return (
    <PublicLayout>
      <div className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-narrow">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              {page.title}
            </h1>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>
          
          {/* Prose styling for the rich text HTML content */}
          <div 
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none 
              prose-headings:font-heading prose-headings:font-semibold 
              prose-a:text-primary hover:prose-a:text-primary-dark
              prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </PublicLayout>
  );
}
