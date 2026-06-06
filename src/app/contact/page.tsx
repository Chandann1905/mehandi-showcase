import { Metadata } from "next";
import { PublicLayout } from "@/components/layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { settingsService } from "@/services/settings.service";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Creative Mehndi Art for bookings, inquiries, or custom package requests.",
};

export const revalidate = 3600;

export default async function ContactPage() {
  const settings = await settingsService.getSettings();

  return (
    <PublicLayout>
      <div className="pt-24 pb-16 bg-background">
        <div className="container-page">
          <SectionHeading 
            title="Get in Touch" 
            subtitle="We'd love to hear from you. Reach out for bookings or any questions." 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto mt-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6">Contact Information</h3>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Whether you're planning your wedding, organizing a corporate event, or just want to adorn your hands for a festival, we are here to provide you with the best mehndi experience.
              </p>

              <div className="space-y-8">
                {settings.address && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-lg mb-1">Our Studio</h4>
                      <p className="text-muted-foreground">{settings.address}</p>
                    </div>
                  </div>
                )}

                {settings.phone && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-lg mb-1">Phone</h4>
                      <a href={`tel:${settings.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings.email && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-lg mb-1">Email</h4>
                      <a href={`mailto:${settings.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-lg mb-1">Working Hours</h4>
                    <p className="text-muted-foreground">Mon - Sun: 9:00 AM - 8:00 PM</p>
                    <p className="text-sm text-muted-foreground/80 mt-1">Available for outstation events by appointment.</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-12 pt-8 border-t border-border">
                <h4 className="font-medium text-foreground mb-4">Follow us on social media</h4>
                <div className="flex space-x-4">
                  {settings.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors font-bold text-sm">
                      IG
                    </a>
                  )}
                  {settings.facebook && (
                    <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors font-bold text-sm">
                      FB
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 md:p-10 rounded-3xl shadow-medium border border-border">
              <h3 className="text-2xl font-heading font-bold mb-2">Send us a message</h3>
              <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
