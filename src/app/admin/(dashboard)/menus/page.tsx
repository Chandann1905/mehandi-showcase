"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuService } from "@/services/menu.service";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { MenuItem } from "@/types/menu.types";

export default function MenuBuilderPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMenus = async () => {
    try {
      const data = await menuService.getAllMenus();
      setMenus(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load menus");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleToggle = async (id: string, current: boolean) => {
    try {
      setMenus(prev => prev.map(m => m.id === id ? { ...m, visible: !current } : m));
      await menuService.updateMenu(id, { visible: !current }, "admin");
      toast.success("Menu updated");
    } catch (e) {
      toast.error("Failed to update menu");
      fetchMenus();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeading title="Menu Builder" subtitle="Manage navigation links for Header and Footer" />
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" /> Add Link
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Visible</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : menus.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No menus found. Static fallbacks are being used.
                </TableCell>
              </TableRow>
            ) : (
              menus.map((menu) => (
                <TableRow key={menu.id}>
                  <TableCell className="font-medium">{menu.label}</TableCell>
                  <TableCell className="text-muted-foreground">{menu.url}</TableCell>
                  <TableCell className="capitalize">{menu.location || "Header"}</TableCell>
                  <TableCell>{menu.sort_order}</TableCell>
                  <TableCell className="text-right">
                    <Switch 
                      checked={menu.visible}
                      onCheckedChange={() => handleToggle(menu.id!, menu.visible)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
