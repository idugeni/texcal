'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t border-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 animate-in fade-in-50 duration-700">
          <div className="flex items-center gap-4">
            <Link href="https://github.com/idugeni/texcal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Github className="h-5 w-5" />
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} TexCal - Kalkulator Masa Pidana</p>
            <p className="text-xs text-muted-foreground/70 mt-2">Dibuat dengan ❤️ menggunakan Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  )
}