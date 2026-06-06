"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Save, X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { pageService } from "@/services/page.service";

const pageSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters."),
  content: z.string().min(10, "Content is required."),
  published: z.boolean().default(true),
});

type PageFormValues = z.infer<typeof pageSchema>;

interface PageFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function PageForm({ initialData, isEdit }: PageFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      published: initialData?.published ?? true,
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("title", value);
    if (!isEdit && !form.getValues("slug")) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  };

  async function onSubmit(data: PageFormValues) {
    setIsSubmitting(true);
    try {
      if (isEdit && initialData?.id) {
        await pageService.updatePage(
          initialData.id,
          {
            title: data.title,
            slug: data.slug,
            content: data.content,
            published: data.published,
          },
          "admin-id",
          "Admin"
        );
        toast.success("Page updated successfully");
      } else {
        await pageService.createPage(
          {
            title: data.title,
            slug: data.slug,
            content: data.content,
            published: data.published,
          },
          "admin-id",
          "Admin"
        );
        toast.success("Page created successfully");
      }
      
      router.push("/admin/pages");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save page.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Page Content</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Title *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., About Us" 
                      {...field} 
                      onChange={handleTitleChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug *</FormLabel>
                  <FormControl>
                    <Input placeholder="about-us" {...field} />
                  </FormControl>
                  <FormDescription>Must be unique, lowercase, no spaces.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (Markdown supported) *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Write your page content here..." 
                    className="min-h-[300px] resize-y font-mono text-sm"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Settings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published Status</FormLabel>
                    <FormDescription>
                      Make this page visible on the website.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" asChild className="rounded-full">
            <Link href="/admin/pages">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Link>
          </Button>
          <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Page"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
