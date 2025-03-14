'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/80 border-b border-muted/20">
      <div className="mx-auto py-4 px-4 flex justify-between items-center animate-in fade-in-50 duration-500">
        <Link href="/" className="inline-flex">
          <Button variant="ghost" className="flex items-center gap-2 group transition-all duration-300 hover:bg-primary/10">
            <Image 
              src="/logo.png" 
              alt="TexCal Logo" 
              width={28} 
              height={28} 
              className="text-primary group-hover:opacity-80 transition-opacity duration-300" 
            />
            <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              TexCal
            </span>
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center">
            <Link href="/telraam">
              <Button variant="ghost" className="hover:bg-primary/10 transition-colors duration-300">Telraam</Button>
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}