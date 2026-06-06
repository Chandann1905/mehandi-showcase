"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Save, X } from "lucide-react";
import Link from "next/link";
import { MediaPicker } from "@/components/shared/MediaPicker";
import { STORAGE_PATHS } from "@/constants/storage-paths";

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
import { categoryService } from "@/services/category.service";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters."),
  description: z.string().optional(),
  published: z.boolean().default(true),
  priority: z.coerce.number().int().default(0),
  image_url: z.string().min(1, "Category image is required."),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData?: any; // For editing
  isEdit?: boolean;
}

export function CategoryForm({ initialData, isEdit }: CategoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      published: initialData?.published ?? true,
      priority: initialData?.priority || 0,
      image_url: initialData?.image_url || "",
    },
  });

  // Auto-generate slug from name if slug is empty
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("name", value);
    if (!isEdit && !form.getValues("slug")) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  };

  async function onSubmit(data: CategoryFormValues) {
    setIsSubmitting(true);
    try {
      const payload = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        active: data.published,
        sort_order: data.priority,
        image_url: data.image_url,
      };

      if (isEdit && initialData?.id) {
        await categoryService.updateCategory(initialData.id, payload);
        toast.success("Category updated successfully");
      } else {
        await categoryService.createCategory(payload);
        toast.success("Category created successfully");
      }
      
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save category. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Bridal Mehndi" 
                      {...field} 
                      onChange={handleNameChange}
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
                    <Input placeholder="bridal-mehndi" {...field} />
                  </FormControl>
                  <FormDescription>Must be unique, lowercase, no spaces.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image *</FormLabel>
                <FormControl>
                  <MediaPicker
                    folder={STORAGE_PATHS.CATEGORIES}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>Representative image for this category.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of this category..." 
                    className="h-24 resize-y"
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
                      Make this category visible on the website.
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
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5 w-full mr-4">
                    <FormLabel className="text-base">Display Priority</FormLabel>
                    <FormDescription>
                      Higher numbers appear first.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input type="number" className="w-24 text-center" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" asChild className="rounded-full">
            <Link href="/admin/categories">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Link>
          </Button>
          <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
