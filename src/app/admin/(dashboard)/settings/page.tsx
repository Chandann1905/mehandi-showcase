import { Metadata } from "next";
import { SettingsForm } from "@/components/forms/SettingsForm";
import { settingsService } from "@/services/settings.service";

export const metadata: Metadata = {
  title: "Site Settings",
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await settingsService.getSettings();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Global Settings</h1>
        <p className="text-muted-foreground">Configure your platform details, contact info, and social links</p>
      </div>

      <div className="mt-8">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
