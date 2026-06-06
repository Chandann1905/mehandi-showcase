import { Metadata } from "next";
import { PublicLayout } from "@/components/layout";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { packageService } from "@/services/package.service";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bridal Mehndi Packages",
  description: "View our comprehensive bridal and guest mehndi packages with pricing and details.",
};

export const revalidate = 3600;

export default async function PackagesPage() {
  const packages = await packageService.getPackages();

  return (
    <PublicLayout>
      <div className="pt-24 pb-16 bg-muted/30">
        <div className="container-page">
          <SectionHeading 
            title="Our Mehndi Packages" 
            subtitle="Transparent pricing for your special day. Choose the package that best fits your requirements." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative flex flex-col overflow-hidden bg-card transition-all duration-300 hover:shadow-high ${
                  pkg.featured ? "border-primary shadow-medium scale-100 md:scale-105 z-10" : "border-border"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                )}
                
                {pkg.featured && (
                  <div className="absolute top-5 right-5">
                    <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-10">
                  <CardTitle className="font-heading text-2xl mb-2">{pkg.title}</CardTitle>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">₹{pkg.price}</span>
                  </div>
                  <CardDescription className="mt-4 text-sm max-w-xs mx-auto">{pkg.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 pb-8">
                  <div className="bg-muted/50 p-6 rounded-xl">
                    <h4 className="font-medium text-sm text-foreground mb-4 uppercase tracking-wider">What's included:</h4>
                    <ul className="space-y-4">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                          <span className="text-sm text-muted-foreground leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    asChild 
                    className={`w-full rounded-full py-6 text-md ${pkg.featured ? "bg-primary hover:bg-primary-light text-white" : ""}`}
                    variant={pkg.featured ? "default" : "outline"}
                  >
                    <Link href={`/book?package=${pkg.id}`}>Select Package</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-20 max-w-3xl mx-auto bg-card border border-border p-8 rounded-2xl shadow-sm text-center">
            <h3 className="text-2xl font-heading font-semibold mb-4">Need a custom package?</h3>
            <p className="text-muted-foreground mb-6">
              Don't see exactly what you're looking for? We can create a customized package tailored to your specific requirements, guest count, and design preferences.
            </p>
            <Button asChild className="rounded-full px-8">
              <Link href="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
