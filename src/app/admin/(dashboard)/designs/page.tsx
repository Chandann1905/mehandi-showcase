import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
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
import { AppImage } from "@/components/shared/AppImage";
import { designService } from "@/services/design.service";

export default async function AdminDesignsPage() {
  // Fetch designs directly since this is an admin server component
  const result = await designService.getDesigns({}, 50);
  const designs = result.items;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Designs Management</h1>
          <p className="text-muted-foreground">Manage your mehndi design portfolio</p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/designs/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Design
          </Link>
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search designs..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Total: {designs.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views/Favs</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {designs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No designs found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                designs.map((design) => (
                  <TableRow key={design.id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded-md overflow-hidden relative border border-border">
                        <AppImage 
                          src={design.thumbnail_url || "https://placehold.co/100x100?text=No+Img"} 
                          alt={design.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{design.title}</TableCell>
                    <TableCell>{(design as any).category_name || design.category_id}</TableCell>
                    <TableCell>
                      <Badge variant={design.active ? "default" : "secondary"}>
                        {design.active ? "Published" : "Draft"}
                      </Badge>
                      {design.featured && (
                        <Badge variant="outline" className="ml-2 text-primary border-primary">
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center" title="Views"><Eye className="h-3 w-3 mr-1"/>{design.view_count || 0}</span>
                        <span className="flex items-center" title="Favorites"><HeartIcon className="h-3 w-3 mr-1"/>{design.favorite_count || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/gallery/${design.slug}`} target="_blank">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/designs/${design.id}/edit`}>
                            <Edit className="h-4 w-4 text-primary" />
                          </Link>
                        </Button>
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

function HeartIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
