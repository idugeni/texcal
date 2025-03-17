'use client'

import { format, differenceInDays, addDays } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FormData } from '@/components/telraam/CalculatorForm'

interface TimelineVisualizationProps {
  data: FormData
  result: Date
}

export function TimelineVisualization({ data, result }: TimelineVisualizationProps) {
  // Calculate total days of sentence
  const totalDays = (data.masaPidana.tahun * 365) + (data.masaPidana.bulan * 30) + data.masaPidana.hari
  
  // Calculate 2/3 of the sentence
  const twoThirdsDays = Math.ceil((totalDays * 2) / 3)
  
  // Calculate days served so far
  const daysSoFar = differenceInDays(new Date(), data.tglPenahanan)
  
  // Calculate percentage of sentence served
  const percentageServed = Math.min(100, Math.round((daysSoFar / totalDays) * 100))
  
  // Calculate percentage to release date
  const daysToRelease = Math.max(0, differenceInDays(result, new Date()))
  const percentageToRelease = Math.min(100, Math.round((daysSoFar / (daysSoFar + daysToRelease)) * 100))
  
  // Calculate full sentence end date
  const fullSentenceDate = addDays(data.tglPenahanan, totalDays)
  
  return (
    <Card className="border-primary/10 shadow-sm animate-in fade-in-50 duration-700">
      <CardContent className="pt-6 space-y-6">
        <h3 className="text-lg font-semibold text-primary">Visualisasi Masa Pidana</h3>
        
        <div className="space-y-6">
          {/* Timeline visualization */}
          <div className="relative pt-6 pb-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-muted/50 rounded-full">
              {/* Detention start marker */}
              <div className="absolute -top-1 left-0 w-3 h-3 bg-primary rounded-full" />
              
              {/* 2/3 marker */}
              <div 
                className="absolute -top-1 w-3 h-3 bg-primary/70 rounded-full" 
                style={{ left: `${Math.round((twoThirdsDays / totalDays) * 100)}%` }}
              />
              
              {/* Current date marker */}
              <div 
                className="absolute -top-1 w-3 h-3 bg-primary/90 rounded-full animate-pulse" 
                style={{ left: `${Math.min(100, percentageServed)}%` }}
              />
              
              {/* Full sentence marker */}
              <div className="absolute -top-1 right-0 w-3 h-3 bg-muted-foreground rounded-full" />
            </div>
            
            {/* Labels */}
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <div className="text-center">
                <div>Mulai</div>
                <div className="font-medium text-primary">
                  {format(data.tglPenahanan, 'dd/MM/yyyy', { locale: idLocale })}
                </div>
              </div>
              
              <div className="text-center">
                <div>2/3 Masa</div>
                <div className="font-medium text-primary/70">
                  {format(addDays(data.tglPenahanan, twoThirdsDays), 'dd/MM/yyyy', { locale: idLocale })}
                </div>
              </div>
              
              <div className="text-center">
                <div>Selesai</div>
                <div className="font-medium text-muted-foreground">
                  {format(fullSentenceDate, 'dd/MM/yyyy', { locale: idLocale })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress bars */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Masa yang telah dijalani</span>
                <span className="font-medium">{percentageServed}%</span>
              </div>
              <Progress value={percentageServed} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {daysSoFar} hari dari total {totalDays} hari
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progres menuju pembebasan</span>
                <span className="font-medium">{percentageToRelease}%</span>
              </div>
              <Progress value={percentageToRelease} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {daysToRelease > 0 ? `${daysToRelease} hari lagi menuju tanggal pembebasan` : 'Sudah mencapai tanggal pembebasan'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}