import { Metadata } from "next";
import { PublicLayout } from "@/components/layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BookingForm } from "@/components/forms/BookingForm";
import { packageService } from "@/services/package.service";
import { designService } from "@/services/design.service";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Schedule your bridal or guest mehndi session with Creative Mehndi Art.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; design?: string }>;
}) {
  const { package: packageId, design: designId } = await searchParams;

  // Fetch data to pre-populate dropdowns or show selection
  const packages = await packageService.getPackages();
  
  let preselectedDesign = null;
  if (designId) {
    preselectedDesign = await designService.getDesignDetail(designId);
  }

  return (
    <PublicLayout>
      <div className="pt-24 pb-16 bg-muted/30 min-h-screen">
        <div className="container-narrow">
          <SectionHeading 
            title="Book Your Appointment" 
            subtitle="Let's make your special day even more beautiful. Fill out the details below to secure your booking." 
          />

          <div className="bg-card p-8 md:p-10 rounded-3xl shadow-medium border border-border mt-8">
            <BookingForm 
              packages={packages} 
              initialPackageId={packageId} 
              initialDesignId={designId}
              preselectedDesignTitle={preselectedDesign?.title}
            />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
