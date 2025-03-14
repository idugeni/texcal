import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TexCal - Kalkulator Masa Pidana",
  description: "Aplikasi untuk menghitung masa pidana dengan cepat dan akurat. Solusi digital untuk perhitungan masa pidana yang efisien dan tepat.",
  keywords: ["kalkulator masa pidana", "perhitungan pidana", "hukum pidana", "alat hitung pidana", "texcal"],
  authors: [{ name: "TexCal Team" }],
  creator: "TexCal",
  publisher: "TexCal",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://texcal.vercel.app",
    title: "TexCal - Kalkulator Masa Pidana",
    description: "Aplikasi untuk menghitung masa pidana dengan cepat dan akurat. Solusi digital untuk perhitungan masa pidana yang efisien dan tepat.",
    siteName: "TexCal"
  },
  twitter: {
    card: "summary_large_image",
    title: "TexCal - Kalkulator Masa Pidana",
    description: "Aplikasi untuk menghitung masa pidana dengan cepat dan akurat",
    creator: "@texcal"
  },
  alternates: {
    canonical: "https://texcal.vercel.app"
  },
  metadataBase: new URL("https://texcal.vercel.app")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
