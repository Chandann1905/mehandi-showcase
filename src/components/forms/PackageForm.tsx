"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Save, X, Plus, Trash2 } from "lucide-react";
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
import { packageService } from "@/services/package.service";

const packageSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  features: z.array(z.object({
    value: z.string().min(2, "Feature must not be empty")
  })).min(1, "At least one feature is required"),
});

type PackageFormValues = z.infer<typeof packageSchema>;

interface PackageFormProps {
  initialData?: any; // For editing
  isEdit?: boolean;
}

export function PackageForm({ initialData, isEdit }: PackageFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price ? Number(initialData.price) : 0,
      published: initialData?.published ?? true,
      featured: initialData?.featured ?? false,
      features: initialData?.features?.map((f: string) => ({ value: f })) || [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "features",
    control: form.control,
  });

  async function onSubmit(data: PackageFormValues) {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        price: data.price.toString(),
        features: data.features.map(f => f.value),
      };

      if (isEdit && initialData?.id) {
        await packageService.updatePackage(initialData.id, payload);
        toast.success("Package updated successfully");
      } else {
        await packageService.createPackage(payload);
        toast.success("Package created successfully");
      }
      
      router.push("/admin/packages");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save package. Please try again.");
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
                  <FormLabel>Package Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Royal Bridal Package" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (₹) *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of who this package is for..." 
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
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-heading font-semibold">Features Included</h2>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => append({ value: "" })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Feature
            </Button>
          </div>
          
          <div className="space-y-4">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`features.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={index !== 0 ? "sr-only" : ""}>
                      Feature {index + 1}
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="e.g., Full hands up to elbow" {...field} />
                      </FormControl>
                      {fields.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => remove(index)}
                          className="text-destructive shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
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
                      Make this package visible to clients.
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
                    <FormLabel className="text-base">Featured Package</FormLabel>
                    <FormDescription>
                      Highlight this package on the packages page.
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
            <Link href="/admin/packages">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Link>
          </Button>
          <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Package"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
