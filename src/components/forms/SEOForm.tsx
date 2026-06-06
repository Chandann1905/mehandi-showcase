"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Save } from "lucide-react";

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
import { seoService } from "@/services/seo.service";

const seoSchema = z.object({
  meta_title: z.string().min(2, "Meta Title must be at least 2 characters."),
  meta_description: z.string().optional(),
  canonical_url: z.string().url().optional().or(z.literal("")),
  og_image: z.string().url().optional().or(z.literal("")),
});

type SEOFormValues = z.infer<typeof seoSchema>;

interface SEOFormProps {
  initialData?: any;
  entityType: string;
  entityId: string;
}

export function SEOForm({ initialData, entityType, entityId }: SEOFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SEOFormValues>({
    resolver: zodResolver(seoSchema) as any,
    defaultValues: {
      meta_title: initialData?.meta_title || "",
      meta_description: initialData?.meta_description || "",
      canonical_url: initialData?.canonical_url || "",
      og_image: initialData?.og_image || "",
    },
  });

  async function onSubmit(data: SEOFormValues) {
    setIsSubmitting(true);
    try {
      await seoService.updateSEOData(
        entityType as any,
        entityId,
        data,
        "admin-id",
        "Admin"
      );
      toast.success("SEO data updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save SEO data.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">SEO Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="meta_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. Creative Mehndi Art" {...field} />
                  </FormControl>
                  <FormDescription>The title shown in search engine results.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="canonical_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>The preferred URL for this page.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of the page content..." 
                    className="h-24 resize-y"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>Keep it between 150-160 characters for best results.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="og_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Open Graph Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormDescription>Image shown when shared on social media.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end pt-4 border-t border-border">
            <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save SEO Data"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
