import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  data?: any;
}

export function CTASection({ data }: CTASectionProps) {
  const { 
    title = "Ready to adorn your hands?", 
    subtitle = "Book your consultation today and let's create a beautiful, unique mehndi design together.",
    button_text = "Book Your Appointment",
    button_link = "/book"
  } = data || {};

  return (
    <section className="section-padding relative overflow-hidden bg-primary text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />
      
      <div className="container-page relative z-10 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 max-w-3xl">
          {title}
        </h2>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 font-light">
          {subtitle}
        </p>
        <Button 
          asChild 
          size="lg" 
          className="rounded-full px-10 py-6 text-lg bg-secondary hover:bg-secondary-light text-[#0D3B11] font-semibold border-none shadow-medium hover:shadow-high transition-all"
        >
          <Link href={button_link}>{button_text}</Link>
        </Button>
      </div>
    </section>
  );
}
