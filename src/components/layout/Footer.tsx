"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { useSettingsStore } from "@/store/settings.store";

export function Footer() {
  const { settings } = useSettingsStore();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D3B11] text-white pt-16 pb-8 safe-bottom">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Logo variant="gold" />
            <p className="text-white/80 leading-relaxed text-sm">
              Providing premium, intricate, and deeply meaningful bridal and 
              festive mehndi designs with organic, chemical-free henna.
            </p>
            <div className="flex items-center space-x-4">
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-[#0D3B11] transition-colors touch-target flex items-center justify-center font-bold text-xs">
                  IG
                </a>
              )}
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-[#0D3B11] transition-colors touch-target flex items-center justify-center font-bold text-xs">
                  FB
                </a>
              )}
              {settings?.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-[#0D3B11] transition-colors touch-target flex items-center justify-center font-bold text-xs">
                  YT
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-secondary mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-white/80 hover:text-secondary transition-colors inline-block py-1">Home</Link></li>
              <li><Link href="/gallery" className="text-white/80 hover:text-secondary transition-colors inline-block py-1">Design Gallery</Link></li>
              <li><Link href="/packages" className="text-white/80 hover:text-secondary transition-colors inline-block py-1">Bridal Packages</Link></li>
              <li><Link href="/reviews" className="text-white/80 hover:text-secondary transition-colors inline-block py-1">Client Reviews</Link></li>
              <li><Link href="/about" className="text-white/80 hover:text-secondary transition-colors inline-block py-1">About Us</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-secondary mb-6">Information</h3>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-white/80 hover:text-secondary transition-colors inline-block py-1">Contact Us</Link></li>
              <li><Link href="/faq" className="text-white/80 hover:text-secondary transition-colors inline-block py-1">FAQs</Link></li>
              <li><Link href="/terms" className="text-white/80 hover:text-secondary transition-colors inline-block py-1">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-white/80 hover:text-secondary transition-colors inline-block py-1">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-secondary mb-6">Get In Touch</h3>
            <ul className="space-y-4">
              {settings?.address && (
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
                  <span className="text-white/80 text-sm leading-relaxed">{settings.address}</span>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-secondary mr-3 shrink-0" />
                  <a href={`tel:${settings.phone}`} className="text-white/80 hover:text-secondary transition-colors py-1">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-secondary mr-3 shrink-0" />
                  <a href={`mailto:${settings.email}`} className="text-white/80 hover:text-secondary transition-colors py-1">
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; {currentYear} Creative Mehndi Art. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed with <span className="text-secondary">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
