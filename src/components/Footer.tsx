'use client'

export function Footer() {
  return (
    <footer className="bg-background border-t py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} TexCal - Kalkulator Masa Pidana</p>
      </div>
    </footer>
  )
}