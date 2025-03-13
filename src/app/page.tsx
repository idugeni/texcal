import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Calculator, Clock, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">TexCal</span>
        </div>
        <nav>
          <Link href="/kalkulator">
            <Button variant="ghost">Kalkulator</Button>
          </Link>
        </nav>
      </header>

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
            <CalendarDays className="w-32 h-32 text-primary/40" />
          </div>
        </div>
      </main>

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

      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TexCal - Kalkulator Masa Pidana</p>
        </div>
      </footer>
    </div>
  );
}
