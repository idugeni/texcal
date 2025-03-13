'use client'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { FormData } from './CalculatorForm'

interface HistoryItem {
  id: string
  date: Date
  data: FormData
  result: Date
}

interface HistoryDisplayProps {
  history: HistoryItem[]
  onClearHistory: () => void
  onLoadFromHistory: (item: HistoryItem) => void
}

export function HistoryDisplay({ history, onClearHistory, onLoadFromHistory }: HistoryDisplayProps) {
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Perhitungan</CardTitle>
          <CardDescription>
            Belum ada riwayat perhitungan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Riwayat perhitungan akan muncul di sini setelah Anda melakukan perhitungan
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Riwayat Perhitungan</h2>
        <Button variant="outline" size="sm" onClick={onClearHistory}>
          <Trash2 className="h-4 w-4 mr-2" />
          Hapus Semua
        </Button>
      </div>
      
      <div className="space-y-4">
        {history.map((item) => (
          <Card key={item.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => onLoadFromHistory(item)}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">
                  {format(item.result, 'dd MMMM yyyy', { locale: id })}
                </CardTitle>
                <CardDescription className="text-xs">
                  {format(item.date, 'dd/MM/yyyy HH:mm', { locale: id })}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Tanggal Penahanan:</p>
                  <p>{format(item.data.tglPenahanan, 'dd/MM/yyyy', { locale: id })}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Masa Pidana:</p>
                  <p>{item.data.masaPidana.tahun}T {item.data.masaPidana.bulan}B {item.data.masaPidana.hari}H</p>
                </div>
                {(item.data.remisi.bulan > 0 || item.data.remisi.hari > 0) && (
                  <div>
                    <p className="text-muted-foreground">Remisi:</p>
                    <p>{item.data.remisi.bulan}B {item.data.remisi.hari}H</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}