'use client'

import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { Card, CardContent } from '@/components/ui/card'
import { FormData } from '@/components/telraam/CalculatorForm'

interface DetailContentProps {
  data: FormData;
  result: Date;
}

export function DetailContent({ data, result }: DetailContentProps) {
  return (
    <CardContent className="space-y-6 pt-6">
      <div className="p-6 bg-primary/10 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Tanggal Potensi Pembebasan</h3>
        <p className="text-3xl font-bold text-primary">
          {format(result, 'EEEE, dd MMMM yyyy', { locale: idLocale })}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Tanggal ini adalah perkiraan berdasarkan perhitungan 2/3 masa pidana dikurangi remisi
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="border-primary/10">
          <CardContent className="space-y-4 pt-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Nama Lengkap</h4>
              <p className="font-semibold text-lg text-primary">{data.namaNapi}</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Tanggal Penahanan</h4>
              <p className="font-semibold text-lg text-primary">
                {format(data.tglPenahanan, 'dd MMMM yyyy', { locale: idLocale })}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/10">
          <CardContent className="space-y-4 pt-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Masa Pidana</h4>
              <p className="font-semibold text-lg text-primary">
                {data.masaPidana.tahun} Tahun {data.masaPidana.bulan} Bulan {data.masaPidana.hari > 0 ? `${data.masaPidana.hari} Hari` : ''}
              </p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Remisi</h4>
              <p className="font-semibold text-lg text-primary">
                {data.remisi.bulan} Bulan {data.remisi.hari > 0 ? `${data.remisi.hari} Hari` : ''}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  )
}