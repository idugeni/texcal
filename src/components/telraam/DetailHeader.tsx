'use client'

import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FormData } from '@/components/telraam/CalculatorForm'

const InfoIcon = ({ content }: { content: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

interface DetailHeaderProps {
  data: FormData;
  date: Date;
}

export function DetailHeader({ data, date }: DetailHeaderProps) {
  return (
    <CardHeader className="bg-primary/5 p-6">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2">
          <CardTitle className="flex items-center text-2xl font-semibold text-primary">
            Detail Perhitungan
            <span className="ml-2">
              <InfoIcon content="Detail perhitungan berdasarkan data yang dimasukkan dan ketentuan 2/3 masa pidana" />
            </span>
          </CardTitle>
          <CardDescription className="text-base">
            {' '}
            <span className="font-medium text-primary/90">
              {data.namaNapi}
            </span>
          </CardDescription>
        </div>
        <p className="text-sm text-muted-foreground bg-primary/5 px-3 py-1 rounded-md">
          {format(date, 'dd/MM/yyyy • HH:mm', { locale: idLocale })}
        </p>
      </div>
    </CardHeader>
  )
}