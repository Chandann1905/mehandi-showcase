import Link from "next/link";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { packageService } from "@/services/package.service";

interface PackagesSectionProps {
  data?: any;
}

export async function PackagesSection({ data }: PackagesSectionProps) {
  const { title = "Bridal Packages", subtitle = "Choose the perfect package for your special day." } = data || {};
  
  const packages = await packageService.getPackages();
  const featuredPackages = packages.filter(p => p.featured).slice(0, 3);

  if (!featuredPackages || featuredPackages.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-page">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuredPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-high ${
                pkg.featured ? "border-primary shadow-medium scale-100 md:scale-105 z-10" : "border-border"
              }`}
            >
              {pkg.featured && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary" />
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="font-heading text-2xl mb-2">{pkg.title}</CardTitle>
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">₹{pkg.price}</span>
                </div>
                <CardDescription className="mt-4 text-sm">{pkg.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 pb-8">
                <ul className="space-y-4">
                  {pkg.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                      <span className="text-sm text-muted-foreground leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  asChild 
                  className={`w-full rounded-full ${pkg.featured ? "bg-primary hover:bg-primary-light text-white" : ""}`}
                  variant={pkg.featured ? "default" : "outline"}
                >
                  <Link href={`/book?package=${pkg.id}`}>Book This Package</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
