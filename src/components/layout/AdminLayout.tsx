"use client";

import { ReactNode, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      
      <div className="flex-1 flex flex-col md:pl-64 min-w-0 transition-all">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-[130] flex h-16 items-center border-b border-border bg-background px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-4 -ml-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="font-heading font-semibold text-lg">Admin Panel</span>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
