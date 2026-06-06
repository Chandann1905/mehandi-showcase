import { Metadata } from "next";
import { AdminLayout } from "@/components/layout";
import { AdminProtectedRoute } from "@/components/auth/AdminProtectedRoute";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Portal",
    default: "Dashboard | Admin Portal",
  },
  robots: "noindex, nofollow", // Keep admin panel out of search engines
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        {children}
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
