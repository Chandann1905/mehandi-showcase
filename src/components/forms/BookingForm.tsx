"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingService } from "@/services/booking.service";
import type { Package } from "@/types/package.types";

const bookingFormSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters."),
  mobile: z.string().min(10, "Please enter a valid 10-digit mobile number."),
  event_date: z.string().min(1, "Please select an event date."), // Simplified date for now
  location: z.string().min(5, "Please provide the full event address."),
  package_id: z.string().optional(),
  design_id: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  packages: Package[];
  initialPackageId?: string;
  initialDesignId?: string;
  preselectedDesignTitle?: string;
}

export function BookingForm({ 
  packages, 
  initialPackageId, 
  initialDesignId,
  preselectedDesignTitle 
}: BookingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      customer_name: "",
      mobile: "",
      event_date: "",
      location: "",
      package_id: initialPackageId || "",
      design_id: initialDesignId || "",
      notes: "",
    },
  });

  async function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    try {
      const result = await bookingService.submitBooking(data);
      
      if (result.success && result.data?.booking_number) {
        toast.success("Booking Request Submitted!");
        // Redirect to success page to handle WhatsApp logic
        router.push(`/book/success?id=${result.data.booking_number}`);
      } else {
        toast.error(result.error || "Failed to submit booking.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Pre-selections Display */}
        {preselectedDesignTitle && (
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-start">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-3 shrink-0" />
            <div>
              <p className="font-medium text-foreground">Design Selected:</p>
              <p className="text-sm text-muted-foreground">{preselectedDesignTitle}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number (WhatsApp) *</FormLabel>
                <FormControl>
                  <Input placeholder="9876543210" type="tel" {...field} />
                </FormControl>
                <FormDescription>We will contact you via WhatsApp to confirm.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="event_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Date *</FormLabel>
                <FormControl>
                   <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="package_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Package</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a package (Optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Not sure yet / Custom</SelectItem>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.title} - ₹{pkg.price}
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Location / Address *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Full address where the mehndi session will take place..." 
                  className="resize-y"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes or Requirements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any specific requests, guest count, allergies, etc." 
                  className="resize-y"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting Request..." : "Request Booking"}
        </Button>
      </form>
    </Form>
  );
}
