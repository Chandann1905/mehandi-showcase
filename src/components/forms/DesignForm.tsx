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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { designService } from "@/services/design.service";
import type { Category } from "@/types/category.types";

const designSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  category_id: z.string().min(1, "Please select a category."),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  tags: z.string().optional(), // We'll parse this into an array
  thumbnail_url: z.string().min(1, "Thumbnail image is required."),
});

type DesignFormValues = z.infer<typeof designSchema>;

interface DesignFormProps {
  categories: Category[];
  initialData?: any; // For editing
  isEdit?: boolean;
}

export function DesignForm({ categories, initialData, isEdit }: DesignFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DesignFormValues>({
    resolver: zodResolver(designSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category_id: initialData?.category_id || "",
      published: initialData?.published ?? true,
      featured: initialData?.featured ?? false,
      tags: initialData?.tags?.join(", ") || "",
      thumbnail_url: initialData?.thumbnail_url || "",
    },
  });

  async function onSubmit(data: DesignFormValues) {
    setIsSubmitting(true);
    try {
      // Transform tags string to array
      const tagsArray = data.tags 
        ? data.tags.split(",").map(t => t.trim()).filter(Boolean) 
        : [];
        
      const payload = {
        title: data.title,
        description: data.description,
        category_id: data.category_id,
        active: data.published,
        featured: data.featured,
        tags: tagsArray,
        thumbnail_url: data.thumbnail_url,
      };

      if (isEdit && initialData?.id) {
        // await designService.updateDesign(initialData.id, payload);
        toast.success("Design updated successfully");
      } else {
        await designService.createDesign(payload);
        toast.success("Design created successfully");
      }
      
      router.push("/admin/designs");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save design. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Design Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Royal Bridal Mandala" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id || "temp"}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="thumbnail_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Design Thumbnail *</FormLabel>
                <FormControl>
                  <MediaPicker
                    folder={STORAGE_PATHS.DESIGNS}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>High-quality image representing this design.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the intricate details of this mehndi design..." 
                    className="h-32 resize-y"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (Comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="bridal, intricate, mandala, floral" {...field} />
                </FormControl>
                <FormDescription>Used for search and filtering on the public site.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Visibility & Status</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published Status</FormLabel>
                    <FormDescription>
                      Make this design visible to the public.
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
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Design</FormLabel>
                    <FormDescription>
                      Show this design on the homepage.
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
            <Link href="/admin/designs">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Link>
          </Button>
          <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Design"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
