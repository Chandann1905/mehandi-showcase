import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  data?: any;
}

export function HeroSection({ data }: HeroSectionProps) {
  const { 
    title = "Exquisite Mehndi Art for Your Special Day", 
    subtitle = "Premium organic henna, intricate designs, and professional service.",
    cta_text = "View Gallery",
    cta_link = "/gallery",
    background_image = "https://images.unsplash.com/photo-1555026410-b97cbb9fcb60?auto=format&fit=crop&q=80&w=2000"
  } = data || {};

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Fallback gradient if no image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background_image})` }}
      >
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="container-page relative z-10 text-center flex flex-col items-center">
        <span className="text-secondary font-medium tracking-widest uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Welcome to Creative Mehndi Art
        </span>
        <h1 className="text-white mb-6 max-w-4xl text-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          {title}
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-10 font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary-light text-white">
            <Link href="/book">Book an Appointment</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-white/10 text-white border-white/20 hover:bg-white hover:text-primary backdrop-blur-sm">
            <Link href={cta_link}>{cta_text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
