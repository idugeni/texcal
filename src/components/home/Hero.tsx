'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useViewportAnimation } from "@/hooks/use-viewport-animation";

export function Hero() {
  const titleAnimation = useViewportAnimation({ threshold: 0.2, repeat: true });
  const descAnimation = useViewportAnimation({ threshold: 0.2, delay: 300, repeat: true });
  const buttonAnimation = useViewportAnimation({ threshold: 0.2, delay: 500, repeat: true });
  const imageAnimation = useViewportAnimation({ threshold: 0.1, repeat: true });
  
  return (
    <main className="flex-1 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h1 
          ref={titleAnimation.ref as React.RefObject<HTMLHeadingElement>}
          className={`text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all duration-700 ${titleAnimation.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
        >
          Telraam Masa Pidana
        </h1>
        <p 
          ref={descAnimation.ref as React.RefObject<HTMLParagraphElement>}
          className={`text-lg text-muted-foreground max-w-[600px] transition-all duration-1000 ${descAnimation.isInView ? 'opacity-100' : 'opacity-0'}`}
        >
          Aplikasi yang membantu Anda menghitung masa pidana dengan cepat dan akurat. 
          Dirancang untuk memudahkan proses perhitungan dan dokumentasi.
        </p>
        <div 
          ref={buttonAnimation.ref as React.RefObject<HTMLDivElement>}
          className={`flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start transition-all duration-1000 ${buttonAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <Link href="/telraam">
            <Button size="lg" className="gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <Calculator className="h-5 w-5" />
              Mulai Hitung
            </Button>
          </Link>
        </div>
      </div>

      <div 
        ref={imageAnimation.ref as React.RefObject<HTMLDivElement>}
        className={`flex-1 flex justify-center transition-all duration-700 ${imageAnimation.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
      >
        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-br from-muted/40 to-muted/10 rounded-2xl p-8 flex items-center justify-center shadow-xl backdrop-blur-sm border border-muted/20 hover:border-primary/20 transition-all duration-300">
          <Calculator className="w-32 h-32 text-primary/40 animate-pulse duration-[3000ms]" />
        </div>
      </div>
    </main>
  );
}