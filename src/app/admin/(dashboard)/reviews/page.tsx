import Link from "next/link";
import { Search, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { reviewService } from "@/services/review.service";
import { formatDate } from "@/lib/utils";

export default async function AdminReviewsPage() {
  const reviews = await reviewService.getReviews();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Reviews Management</h1>
          <p className="text-muted-foreground">Manage customer reviews and ratings</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reviews..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Total: {reviews.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="max-w-[300px]">Review</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No reviews found.
                  </TableCell>
                </TableRow>
              ) : (
                reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.customer_name}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-yellow-500">
                        {review.rating} / 5
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate" title={review.review_text}>
                      {review.review_text}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          review.status === "approved" ? "default" :
                          review.status === "rejected" ? "destructive" : "secondary"
                        }
                      >
                        {review.status}
                      </Badge>
                      {review.featured && (
                        <Badge variant="outline" className="ml-2 border-primary text-primary">
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {review.created_at ? formatDate(review.created_at.toDate()) : "Unknown"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/reviews/${review.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                          <Edit className="h-4 w-4 text-primary" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
