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
import { AppImage } from "@/components/shared/AppImage";
import { categoryService } from "@/services/category.service";

export default async function AdminCategoriesPage() {
  const categories = await categoryService.getCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Categories Management</h1>
          <p className="text-muted-foreground">Manage your mehndi design categories</p>
        </div>
        <Link href="/admin/categories/new" className={buttonVariants({ className: "rounded-full" })}>
          <Plus className="mr-2 h-4 w-4" /> Add New Category
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search categories..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Total: {categories.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No categories found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded-full overflow-hidden relative border border-border">
                        <AppImage 
                          src={category.image_url || "https://placehold.co/100x100?text=No+Img"} 
                          alt={category.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{category.slug}</TableCell>
                    <TableCell>
                      <Badge variant={category.active ? "default" : "secondary"}>
                        {category.active ? "Active" : "Hidden"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{category.sort_order}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/categories/${category.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
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
