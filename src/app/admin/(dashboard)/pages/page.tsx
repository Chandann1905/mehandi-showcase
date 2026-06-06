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
import { pageService } from "@/services/page.service";
import { formatDate } from "@/lib/utils";

export default async function AdminPagesPage() {
  const pages = await pageService.getPages();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Pages Management</h1>
          <p className="text-muted-foreground">Manage your custom website pages</p>
        </div>
        <Link href="/admin/pages/new" className={buttonVariants({ className: "rounded-full" })}>
          <Plus className="mr-2 h-4 w-4" /> Create New Page
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search pages..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Total: {pages.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No pages found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">/{page.slug}</TableCell>
                    <TableCell>
                      <Badge variant={page.published ? "default" : "secondary"}>
                        {page.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {page.created_at ? formatDate(page.created_at.toDate()) : "Unknown"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/pages/${page.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
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
