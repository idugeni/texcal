'use client'

import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  return (
    <header className="container mx-auto py-6 px-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Clock className="h-6 w-6 text-primary" />
        <span className="text-xl font-semibold">TexCal</span>
      </div>
      <div className="flex items-center gap-4">
        <nav>
          <Link href="/kalkulator">
            <Button variant="ghost">Kalkulator</Button>
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}