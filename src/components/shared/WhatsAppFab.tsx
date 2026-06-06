"use client";

import { MessageCircle } from "lucide-react";
import { useSettingsStore } from "@/store/settings.store";

export function WhatsAppFab() {
  const { settings } = useSettingsStore();
  
  if (!settings?.whatsapp) return null;

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hi! I would like to know more about your Mehndi services.");
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-[800] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform hover:scale-110 active:scale-95 touch-target"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
}
