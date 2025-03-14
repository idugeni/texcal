'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export function Hero() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Kalkulator Masa Pidana
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          Aplikasi yang membantu Anda menghitung masa pidana dengan cepat dan akurat. 
          Dirancang untuk memudahkan proses perhitungan dan dokumentasi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
          <Link href="/kalkulator">
            <Button size="lg" className="gap-2">
              <Calculator className="h-5 w-5" />
              Mulai Hitung
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-muted/30 rounded-lg p-6 flex items-center justify-center">
          <Calculator className="w-32 h-32 text-primary/40" />
        </div>
      </div>
    </main>
  );
}