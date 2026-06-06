import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
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
import { packageService } from "@/services/package.service";

export default async function AdminPackagesPage() {
  const packages = await packageService.getPackages();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Packages Management</h1>
          <p className="text-muted-foreground">Manage your mehndi service packages</p>
        </div>
        <Link href="/admin/packages/new" className={buttonVariants({ className: "rounded-full" })}>
          <Plus className="mr-2 h-4 w-4" /> Add New Package
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search packages..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Total: {packages.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package Name</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No packages found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">
                      {pkg.title}
                      {pkg.featured && (
                        <Badge variant="outline" className="ml-2 text-primary border-primary text-[10px] h-5 px-1.5">
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-mono">{pkg.price}</TableCell>
                    <TableCell>
                      <Badge variant={pkg.active ? "default" : "secondary"}>
                        {pkg.active ? "Active" : "Hidden"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {pkg.features?.join(", ") || "No features added"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/packages/${pkg.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                          <Edit className="h-4 w-4 text-primary" />
                        </Link>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
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
