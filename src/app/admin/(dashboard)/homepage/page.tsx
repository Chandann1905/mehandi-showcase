"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homepageService } from "@/services/homepage.service";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { HomepageSection } from "@/types/homepage.types";

export default function HomepageBuilderPage() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSections = async () => {
    try {
      const data = await homepageService.getAllSections();
      setSections(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load sections");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleToggle = async (id: string, current: boolean) => {
    try {
      setSections(prev => prev.map(s => s.id === id ? { ...s, enabled: !current } : s));
      await homepageService.updateSection(id, { enabled: !current }, "admin");
      toast.success("Section updated");
    } catch (e) {
      toast.error("Failed to update section");
      fetchSections();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeading title="Homepage Builder" subtitle="Manage dynamic sections on the homepage" />
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Enabled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : sections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No sections found. Defaults are being used on the public site.
                </TableCell>
              </TableRow>
            ) : (
              sections.map((section) => (
                <TableRow key={section.id}>
                  <TableCell className="font-medium capitalize">{section.section_type.replace('_', ' ')}</TableCell>
                  <TableCell>{section.sort_order}</TableCell>
                  <TableCell>
                    <Badge variant={section.enabled ? "default" : "secondary"}>
                      {section.enabled ? "Active" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch 
                      checked={section.enabled}
                      onCheckedChange={() => handleToggle(section.id!, section.enabled)}
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
