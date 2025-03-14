'use client'

import { Shield } from "lucide-react";

export function About() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Tentang Aplikasi</h2>
            <p className="text-muted-foreground mb-4">
              TexCal adalah aplikasi kalkulator masa pidana yang dirancang untuk membantu petugas dan praktisi hukum dalam menghitung masa pidana dengan cepat dan akurat.
            </p>
            <p className="text-muted-foreground">
              Aplikasi ini menggunakan perhitungan yang sesuai dengan ketentuan hukum yang berlaku, mempertimbangkan faktor-faktor seperti remisi dan ketentuan khusus lainnya.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center">
              <Shield className="w-24 h-24 text-primary/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}