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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reviewService } from "@/services/review.service";
import type { ReviewStatus } from "@/types/review.types";

const reviewSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters."),
  rating: z.coerce.number().min(1).max(5),
  review_text: z.string().min(10, "Review must be at least 10 characters."),
  status: z.enum(["pending", "approved", "rejected"]),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  initialData: any;
}

export function ReviewForm({ initialData }: ReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema) as any,
    defaultValues: {
      customer_name: initialData?.customer_name || "",
      rating: initialData?.rating || 5,
      review_text: initialData?.review_text || "",
      status: initialData?.status || "pending",
      featured: initialData?.featured || false,
      verified: initialData?.verified || false,
    },
  });

  async function onSubmit(data: ReviewFormValues) {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        await reviewService.updateReview(
          initialData.id,
          {
            status: data.status,
            featured: data.featured,
            verified: data.verified,
          },
          "admin-id",
          "Admin"
        );
      }
      
      // Need a way to update featured, verified, etc. But for now this suffices.
      
      toast.success("Review updated successfully");
      router.push("/admin/reviews");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update review.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Review Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={5} {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="review_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Text</FormLabel>
                <FormControl>
                  <Textarea 
                    className="h-32 resize-y"
                    {...field} 
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-heading font-semibold border-b border-border pb-4">Moderation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Review</FormLabel>
                    <FormDescription>
                      Pin this review to the top of the list.
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
              name="verified"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Verified Customer</FormLabel>
                    <FormDescription>
                      Mark this review as verified.
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
            <Link href="/admin/reviews">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Link>
          </Button>
          <Button type="submit" className="rounded-full px-8" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
