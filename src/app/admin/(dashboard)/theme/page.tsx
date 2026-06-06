import { Metadata } from "next";
import { ThemeForm } from "@/components/forms/ThemeForm";
import { themeService } from "@/services/theme.service";

export const metadata: Metadata = {
  title: "Theme Builder",
};

export const dynamic = "force-dynamic";

export default async function AdminThemePage() {
  const theme = await themeService.getTheme();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Theme Builder</h1>
        <p className="text-muted-foreground">Customize your brand colors, typography, and site appearance</p>
      </div>

      <div className="mt-8">
        <ThemeForm initialData={theme} />
      </div>
    </div>
  );
}
