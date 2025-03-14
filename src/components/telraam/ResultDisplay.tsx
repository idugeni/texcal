import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, CheckCircle2 } from 'lucide-react'

interface ResultDisplayProps {
  date: Date
}

export function ResultDisplay({ date }: ResultDisplayProps) {
  return (
    <Card className="border-2 border-primary/20 shadow-md overflow-hidden animate-in fade-in-50 slide-in-from-bottom-10 duration-700">
      <CardHeader className="bg-primary/10 relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
        <div className="relative z-10">
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Hasil Perhitungan
          </CardTitle>
          <CardDescription className="text-base">Berdasarkan perhitungan 2/3 masa pidana</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-8 pb-8 bg-gradient-to-br from-background to-primary/5">
        <div className="text-center p-6 bg-background/80 rounded-xl border border-primary/10 shadow-sm">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">Tanggal Potensi Pembebasan</p>
          <p className="text-3xl font-bold text-primary bg-clip-text bg-gradient-to-r from-primary to-primary/70 text-transparent">
            {format(date, 'EEEE, dd MMMM yyyy', { locale: idLocale })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}