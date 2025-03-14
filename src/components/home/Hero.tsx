'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export function Hero() {
  return (
    <main className="flex-1 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6 text-center md:text-left animate-in slide-in-from-left duration-700">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Telraam Masa Pidana
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px] animate-in fade-in-50 duration-1000 delay-300">
          Aplikasi yang membantu Anda menghitung masa pidana dengan cepat dan akurat. 
          Dirancang untuk memudahkan proses perhitungan dan dokumentasi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start animate-in fade-in-50 duration-1000 delay-500">
          <Link href="/telraam">
            <Button size="lg" className="gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <Calculator className="h-5 w-5" />
              Mulai Hitung
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex justify-center animate-in slide-in-from-right duration-700">
        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-br from-muted/40 to-muted/10 rounded-2xl p-8 flex items-center justify-center shadow-xl backdrop-blur-sm border border-muted/20 hover:border-primary/20 transition-all duration-300">
          <Calculator className="w-32 h-32 text-primary/40 animate-pulse duration-[3000ms]" />
        </div>
      </div>
    </main>
  );
}