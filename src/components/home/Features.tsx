'use client'

import { Calculator, Clock, FileText } from "lucide-react";
import { useViewportAnimation } from "@/hooks/use-viewport-animation";

export function Features() {
  const titleAnimation = useViewportAnimation({ threshold: 0.2, repeat: true });
  const descAnimation = useViewportAnimation({ threshold: 0.2, delay: 200, repeat: true });
  const card1Animation = useViewportAnimation({ threshold: 0.1, delay: 300, repeat: true });
  const card2Animation = useViewportAnimation({ threshold: 0.1, delay: 500, repeat: true });
  const card3Animation = useViewportAnimation({ threshold: 0.1, delay: 700, repeat: true });
  
  return (
    <section className="bg-gradient-to-b from-background to-muted/20 py-24">
      <div className="container mx-auto px-4">
        <h2 
          ref={titleAnimation.ref as React.RefObject<HTMLHeadingElement>}
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${titleAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
        >
          Fitur Utama
        </h2>
        <p 
          ref={descAnimation.ref as React.RefObject<HTMLParagraphElement>}
          className={`text-muted-foreground text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${descAnimation.isInView ? 'opacity-100' : 'opacity-0'}`}
        >
          Solusi modern untuk perhitungan masa pidana yang efisien dan akurat
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            ref={card1Animation.ref as React.RefObject<HTMLDivElement>}
            className={`bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-muted/20 flex flex-col items-center text-center hover:shadow-xl hover:border-primary/20 transition-all duration-700 ${card1Animation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <Calculator className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Perhitungan Akurat</h3>
            <p className="text-muted-foreground">Hitung masa pidana dengan tepat berdasarkan ketentuan yang berlaku.</p>
          </div>
          
          <div 
            ref={card2Animation.ref as React.RefObject<HTMLDivElement>}
            className={`bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-muted/20 flex flex-col items-center text-center hover:shadow-xl hover:border-primary/20 transition-all duration-700 ${card2Animation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Hemat Waktu</h3>
            <p className="text-muted-foreground">Proses perhitungan yang cepat dan efisien untuk menghemat waktu Anda.</p>
          </div>
          
          <div 
            ref={card3Animation.ref as React.RefObject<HTMLDivElement>}
            className={`bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-muted/20 flex flex-col items-center text-center hover:shadow-xl hover:border-primary/20 transition-all duration-700 ${card3Animation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Riwayat Perhitungan</h3>
            <p className="text-muted-foreground">Simpan dan akses riwayat perhitungan Anda dengan mudah.</p>
          </div>
        </div>
      </div>
    </section>
  );
}