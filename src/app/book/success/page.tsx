import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, MessageCircle, Calendar } from "lucide-react";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { settingsService } from "@/services/settings.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Booking Submitted Successfully",
};

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const settings = await settingsService.getSettings();
  
  const whatsappNumber = settings.whatsapp;
  const whatsappMsg = encodeURIComponent(
    `Hello! I just submitted a booking request on your website. My Booking ID is: ${id || "Unknown"}. I would like to confirm the details.`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <PublicLayout>
      <div className="pt-32 pb-24 bg-background min-h-screen flex items-center">
        <div className="container-narrow text-center">
          <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Booking Request Received!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Thank you for choosing Creative Mehndi Art. We have received your request and will review it shortly.
          </p>

          {id && (
            <div className="bg-muted p-6 rounded-2xl max-w-md mx-auto mb-10 border border-border">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Your Booking Reference</p>
              <p className="text-2xl font-bold tracking-tight font-mono text-primary">{id}</p>
            </div>
          )}

          <div className="bg-card border border-border shadow-sm p-8 rounded-3xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-heading font-semibold mb-4">Next Steps</h3>
            
            <div className="flex flex-col md:flex-row gap-8 text-left my-8">
              <div className="flex-1 flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Send us a WhatsApp</h4>
                  <p className="text-muted-foreground text-sm">Please send us a message on WhatsApp with your booking ID to confirm the slot and finalize details.</p>
                </div>
              </div>
              
              <div className="flex-1 flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <span className="font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Advance Payment</h4>
                  <p className="text-muted-foreground text-sm">Once confirmed on WhatsApp, you'll need to pay a small advance to lock in your date.</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="rounded-full w-full sm:w-auto px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Confirm on WhatsApp Now
              </a>
            </Button>
          </div>

          <div className="mt-12">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
