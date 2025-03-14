'use client'

import { Shield } from "lucide-react";

export function About() {
  return (
    <section className="py-24 bg-gradient-to-t from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-in slide-in-from-left duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Tentang Aplikasi</h2>
            <div className="h-1 w-20 bg-primary/30 rounded-full mb-8"></div>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              TexCal adalah aplikasi kalkulator masa pidana yang dirancang untuk membantu petugas dan praktisi hukum dalam menghitung masa pidana dengan cepat dan akurat.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Aplikasi ini menggunakan perhitungan yang sesuai dengan ketentuan hukum yang berlaku, mempertimbangkan faktor-faktor seperti remisi dan ketentuan khusus lainnya.
            </p>
          </div>
          <div className="flex-1 flex justify-center animate-in slide-in-from-right duration-700">
            <div className="bg-gradient-to-br from-muted/40 to-muted/10 rounded-2xl p-12 flex items-center justify-center shadow-xl backdrop-blur-sm border border-muted/20 hover:border-primary/20 transition-all duration-300">
              <Shield className="w-32 h-32 text-primary/40 animate-pulse duration-[3000ms]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}