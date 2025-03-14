'use client'

import { Calculator, Clock, FileText } from "lucide-react";

export function Features() {
  return (
    <section className="bg-gradient-to-b from-background to-muted/20 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-in fade-in-50 duration-700">Fitur Utama</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 animate-in fade-in-50 duration-700 delay-200">Solusi modern untuk perhitungan masa pidana yang efisien dan akurat</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-muted/20 flex flex-col items-center text-center hover:shadow-xl hover:border-primary/20 transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-10 duration-700 delay-300">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <Calculator className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Perhitungan Akurat</h3>
            <p className="text-muted-foreground">Hitung masa pidana dengan tepat berdasarkan ketentuan yang berlaku.</p>
          </div>
          
          <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-muted/20 flex flex-col items-center text-center hover:shadow-xl hover:border-primary/20 transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-10 duration-700 delay-500">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Hemat Waktu</h3>
            <p className="text-muted-foreground">Proses perhitungan yang cepat dan efisien untuk menghemat waktu Anda.</p>
          </div>
          
          <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-muted/20 flex flex-col items-center text-center hover:shadow-xl hover:border-primary/20 transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-10 duration-700 delay-700">
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