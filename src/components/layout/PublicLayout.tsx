"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { WhatsAppFab } from "@/components/shared/WhatsAppFab";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

interface PublicLayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function PublicLayout({ children, hideHeader, hideFooter }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary">
      {!hideHeader && <Header />}
      
      <main className="flex-1">
        {children}
      </main>
      
      {!hideFooter && <Footer />}
      <MobileBottomNav />
      <WhatsAppFab />
      <ScrollToTop />
    </div>
  );
}
