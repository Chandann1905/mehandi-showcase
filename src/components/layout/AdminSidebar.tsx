"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  FolderTree, 
  Package, 
  CalendarHeart, 
  Star, 
  Settings, 
  Menu,
  LogOut,
  Users
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarHeart },
  { label: "Designs", href: "/admin/designs", icon: ImageIcon },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const handleLogout = async () => {
    if (user?.uid && user?.email) {
      await authService.logout(user.uid, user.email);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-[140] bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-[150] w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Logo variant="dark" className="scale-90 origin-left" />
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border space-y-4">
          <div className="flex items-center space-x-3 px-2">
            <div className="bg-primary/10 p-2 rounded-full text-primary">
              <Users className="h-4 w-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role || "Admin"}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
