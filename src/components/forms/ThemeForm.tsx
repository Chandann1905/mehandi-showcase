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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themeService } from "@/services/theme.service";

const themeSchema = z.object({
  primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color code"),
  secondary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color code"),
  success_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color code"),
  error_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color code"),
  heading_font: z.string().min(1),
  body_font: z.string().min(1),
  border_radius: z.string().min(1),
  shadow_style: z.string().min(1),
  logo: z.string().url().optional().or(z.literal("")),
  logo_dark: z.string().url().optional().or(z.literal("")),
  favicon: z.string().url().optional().or(z.literal("")),
});

type ThemeFormValues = z.infer<typeof themeSchema>;

interface ThemeFormProps {
  initialData?: any;
}

export function ThemeForm({ initialData }: ThemeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeSchema) as any,
    defaultValues: {
      primary_color: initialData?.primary_color || "#1B5E20",
      secondary_color: initialData?.secondary_color || "#D4A017",
      success_color: initialData?.success_color || "#16a34a",
      error_color: initialData?.error_color || "#dc2626",
      heading_font: initialData?.heading_font || "Playfair Display",
      body_font: initialData?.body_font || "Inter",
      border_radius: initialData?.border_radius || "12px",
      shadow_style: initialData?.shadow_style || "medium",
      logo: initialData?.logo || "",
      logo_dark: initialData?.logo_dark || "",
      favicon: initialData?.favicon || "",
    },
  });

  async function onSubmit(data: ThemeFormValues) {
    setIsSubmitting(true);
    try {
      await themeService.updateTheme(
        data,
        "admin-id",
        "Admin"
      );
      toast.success("Theme updated successfully. Refresh to see changes across the site.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save theme.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="primary_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Color</FormLabel>
                  <div className="flex gap-2">
                    <Input type="color" className="w-12 h-10 p-1" {...field} />
                    <FormControl>
                      <Input placeholder="#1B5E20" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondary_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Color</FormLabel>
                  <div className="flex gap-2">
                    <Input type="color" className="w-12 h-10 p-1" {...field} />
                    <FormControl>
                      <Input placeholder="#D4A017" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="success_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Success Color</FormLabel>
                  <div className="flex gap-2">
                    <Input type="color" className="w-12 h-10 p-1" {...field} />
                    <FormControl>
                      <Input placeholder="#16a34a" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="error_color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Error Color</FormLabel>
                  <div className="flex gap-2">
                    <Input type="color" className="w-12 h-10 p-1" {...field} />
                    <FormControl>
                      <Input placeholder="#dc2626" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Typography & Styling</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="heading_font"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading Font</FormLabel>
                  <FormControl>
                    <Input placeholder="Playfair Display" {...field} />
                  </FormControl>
                  <FormDescription>Google Font name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body_font"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body Font</FormLabel>
                  <FormControl>
                    <Input placeholder="Inter" {...field} />
                  </FormControl>
                  <FormDescription>Google Font name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="border_radius"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Global Border Radius</FormLabel>
                  <FormControl>
                    <Input placeholder="12px" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shadow_style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shadow Style</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shadow style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="soft">Soft</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Brand Imagery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL (Light Mode)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo_dark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL (Dark Mode)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favicon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favicon URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Theme"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
