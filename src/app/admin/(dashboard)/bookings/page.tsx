"use client";

import { useEffect, useState } from "react";
import { Search, Edit, Eye, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingService } from "@/services/booking.service";
import type { Booking } from "@/types/booking.types";
import { toast } from "sonner";
import { settingsService } from "@/services/settings.service";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const result = await bookingService.getBookings({}, 50);
      setBookings(result);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await bookingService.updateBookingStatus(bookingId, newStatus as any);
      toast.success("Status updated");
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus as any } : b));
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const openWhatsApp = (mobile: string) => {
    const formatted = mobile.replace(/\D/g, "");
    window.open(`https://wa.me/${formatted}`, "_blank");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "confirmed": return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
      case "completed": return <Badge variant="default" className="bg-primary text-primary-foreground">Completed</Badge>;
      case "cancelled": return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Booking Requests</h1>
          <p className="text-muted-foreground">Manage client appointments and leads</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search name or ID..." className="pl-9" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID / Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Package/Design</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    Loading bookings...
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="font-mono text-sm font-medium">{booking.booking_number}</div>
                      <div className="text-xs text-muted-foreground">
                        {booking.created_at ? format((booking.created_at as any)?.toDate?.() || new Date(booking.created_at as any), "MMM d, yyyy") : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{booking.customer_name}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        {booking.mobile}
                      </div>
                    </TableCell>
                    <TableCell>
                      {booking.event_date ? format((booking.event_date as any)?.toDate?.() || new Date(booking.event_date as any), "MMM d, yyyy") : "TBD"}
                    </TableCell>
                    <TableCell>
                      {booking.package_id && <Badge variant="outline" className="mr-1 text-[10px]">Package</Badge>}
                      {booking.design_id && <Badge variant="outline" className="text-[10px]">Design</Badge>}
                      {!booking.package_id && !booking.design_id && <span className="text-sm text-muted-foreground">Custom/Unsure</span>}
                    </TableCell>
                    <TableCell>
                      <Select 
                        defaultValue={booking.status} 
                        onValueChange={(val) => val && handleStatusChange(booking.id as string, val)}
                      >
                        <SelectTrigger className="w-[130px] h-8 text-xs bg-transparent border-0 p-0 shadow-none focus:ring-0">
                          {getStatusBadge(booking.status)}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => openWhatsApp(booking.mobile)}
                          title="Message on WhatsApp"
                          className="text-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="View Details">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
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
