'use client'

import { Shield } from "lucide-react";
import { useViewportAnimation } from "@/hooks/use-viewport-animation";

export function About() {
  const contentAnimation = useViewportAnimation({ threshold: 0.2, repeat: true });
  const dividerAnimation = useViewportAnimation({ threshold: 0.2, delay: 200, repeat: true });
  const textAnimation = useViewportAnimation({ threshold: 0.2, delay: 400, repeat: true });
  const imageAnimation = useViewportAnimation({ threshold: 0.1, delay: 300, repeat: true });
  
  return (
    <section className="py-24 bg-gradient-to-t from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 
              ref={contentAnimation.ref as React.RefObject<HTMLHeadingElement>}
              className={`text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all duration-700 ${contentAnimation.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            >
              Tentang Aplikasi
            </h2>
            <div 
              ref={dividerAnimation.ref as React.RefObject<HTMLDivElement>}
              className={`h-1 w-20 bg-primary/30 rounded-full mb-8 transition-all duration-700 ${dividerAnimation.isInView ? 'opacity-100 w-20' : 'opacity-0 w-0'}`}
            ></div>
            <div 
              ref={textAnimation.ref as React.RefObject<HTMLDivElement>}
              className={`space-y-6 transition-all duration-1000 ${textAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                TexCal adalah aplikasi kalkulator masa pidana yang dirancang untuk membantu petugas dan praktisi hukum dalam menghitung masa pidana dengan cepat dan akurat.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Aplikasi ini menggunakan perhitungan yang sesuai dengan ketentuan hukum yang berlaku, mempertimbangkan faktor-faktor seperti remisi dan ketentuan khusus lainnya.
              </p>
            </div>
          </div>
          <div 
            ref={imageAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`flex-1 flex justify-center transition-all duration-700 ${imageAnimation.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <div className="bg-gradient-to-br from-muted/40 to-muted/10 rounded-2xl p-12 flex items-center justify-center shadow-xl backdrop-blur-sm border border-muted/20 hover:border-primary/20 transition-all duration-300">
              <Shield className="w-32 h-32 text-primary/40 animate-pulse duration-[3000ms]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}