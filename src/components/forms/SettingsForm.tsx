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
import { settingsService } from "@/services/settings.service";

const settingsSchema = z.object({
  site_name: z.string().min(2, "Site Name must be at least 2 characters."),
  tagline: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  google_maps_url: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
  whatsapp_message_template: z.string().optional(),
  booking_confirmation_message: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
  initialData?: any;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema) as any,
    defaultValues: {
      site_name: initialData?.site_name || "",
      tagline: initialData?.tagline || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      whatsapp: initialData?.whatsapp || "",
      address: initialData?.address || "",
      google_maps_url: initialData?.google_maps_url || "",
      instagram: initialData?.instagram || "",
      facebook: initialData?.facebook || "",
      youtube: initialData?.youtube || "",
      whatsapp_message_template: initialData?.whatsapp_message_template || "",
      booking_confirmation_message: initialData?.booking_confirmation_message || "",
    },
  });

  async function onSubmit(data: SettingsFormValues) {
    setIsSubmitting(true);
    try {
      await settingsService.updateSettings(
        data,
        "admin-id",
        "Admin"
      );
      toast.success("Settings updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save settings.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="site_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Creative Mehndi Art" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input placeholder="Premium Mehndi Designs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Contact & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="contact@..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea className="h-20 resize-y" placeholder="Full address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="google_maps_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Maps Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://maps.google.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Messaging Templates</h2>
          
          <FormField
            control={form.control}
            name="whatsapp_message_template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp Message Template</FormLabel>
                <FormControl>
                  <Textarea className="h-24 resize-y" {...field} />
                </FormControl>
                <FormDescription>Available tags: `{"{{customer_name}}"}`, `{"{{event_date}}"}`, `{"{{booking_number}}"}`</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="booking_confirmation_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Booking Confirmation Message</FormLabel>
                <FormControl>
                  <Textarea className="h-24 resize-y" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
