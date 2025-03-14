'use client'

import { Calculator, Clock, FileText } from "lucide-react";

export function Features() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Fitur Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <Calculator className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Perhitungan Akurat</h3>
            <p className="text-muted-foreground">Hitung masa pidana dengan tepat berdasarkan ketentuan yang berlaku.</p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <Clock className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Hemat Waktu</h3>
            <p className="text-muted-foreground">Proses perhitungan yang cepat dan efisien untuk menghemat waktu Anda.</p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <FileText className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Riwayat Perhitungan</h3>
            <p className="text-muted-foreground">Simpan dan akses riwayat perhitungan Anda dengan mudah.</p>
          </div>
        </div>
      </div>
    </section>
  );
}