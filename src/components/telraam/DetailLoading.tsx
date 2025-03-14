'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DetailLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Skeleton className="h-9 w-36" />
        </div>
        
        <Card className="border-2 border-primary/20 shadow-md animate-in fade-in-50 duration-500">
          <CardHeader className="bg-primary/5 p-6">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-3">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-6 w-32" />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            <Skeleton className="h-28 w-full rounded-lg" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}