import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { StoreHydrationProvider } from "@/providers/StoreHydrationProvider";
import { settingsService } from "@/services/settings.service";
import { themeService } from "@/services/theme.service";
import { Toaster } from "@/components/ui/sonner";

// Initialize standard fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const viewport: Viewport = {
  themeColor: "#1B5E20", // Default Mehndi Green
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Default metadata. Will be overridden by SEO Service per page.
export const metadata: Metadata = {
  title: {
    template: "%s | Creative Mehndi Art",
    default: "Creative Mehndi Art - Premium Bridal Henna",
  },
  description: "Exclusive, intricate, and deeply meaningful bridal and festive mehndi designs.",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch initial state for hydration on the server
  // This ensures no flash of default content and good SEO
  const initialSettings = await settingsService.getSettings();
  const initialTheme = await themeService.getTheme();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans">
        <StoreHydrationProvider initialSettings={initialSettings} initialTheme={initialTheme}>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </StoreHydrationProvider>
      </body>
    </html>
  );
}
