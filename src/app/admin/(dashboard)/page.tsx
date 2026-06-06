import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CalendarHeart, FolderTree, Star, TrendingUp } from "lucide-react";
import { adminRepository } from "@/repositories/admin.repository";

export default async function AdminDashboardPage() {
  // We can fetch high level stats from a dedicated stats endpoint or aggregate here
  // For now, we'll fetch basic counts if our repo supports it, or just show placeholders
  // that will be populated via a real time subscription on the client side if needed.
  
  const stats = await adminRepository.getDashboardStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CalendarHeart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newBookingsThisWeek} this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Designs</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDesigns}</div>
            <p className="text-xs text-muted-foreground">
              Across {stats.totalCategories} categories
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              Requires moderation
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Estimated based on confirmed bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholders for charts/tables */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg text-muted-foreground">
              Recent Bookings Data Table
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Designs</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg text-muted-foreground">
              Top Designs List
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
