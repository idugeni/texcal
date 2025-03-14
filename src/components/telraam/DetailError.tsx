'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface DetailErrorProps {
  error: string | null
}

export function DetailError({ error }: DetailErrorProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/telraam">
            <Button variant="ghost" className="flex items-center text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Telraam
            </Button>
          </Link>
        </div>
        
        <Card className="border-2 border-destructive/20 shadow-md">
          <CardHeader className="bg-destructive/5">
            <CardTitle>Error</CardTitle>
            <CardDescription>
              {error || 'Terjadi kesalahan saat memuat data'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p>Silakan kembali ke halaman telraam dan coba lagi.</p>
          </CardContent>
          <CardFooter className="bg-muted/20 pt-4">
            <Link href="/telraam" className="w-full">
              <Button className="w-full">Kembali ke Telraam</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  )
}