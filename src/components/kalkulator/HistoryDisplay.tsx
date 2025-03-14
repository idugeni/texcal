'use client'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { FormData } from './CalculatorForm'
import Link from 'next/link'

interface HistoryItem {
  id: string
  date: Date
  data: FormData
  result: Date
}

interface HistoryDisplayProps {
  history: HistoryItem[]
  onClearHistory: () => void
  loadFromHistory: (historyItem: HistoryItem) => void
}

export function HistoryDisplay({ history, onClearHistory }: HistoryDisplayProps) {
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
          <div key={item.id} className="group">
            <Link href={`/kalkulator/detail?id=${item.id}`} className="block">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group-hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        {item.data.namaNapi}
                      </CardTitle>
                      <CardTitle className="text-lg font-bold text-primary">
                        Bebas pada {format(item.result, 'dd MMMM yyyy', { locale: id })}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        Perhitungan dibuat pada hari {format(item.date, 'EEEE, dd MMMM yyyy \'pukul\' HH:mm', { locale: id })}
                      </CardDescription>
                    </div>
                    <div className="bg-primary/10 px-3 py-1 rounded-full">
                      <span className="text-xs font-medium text-primary">Detail</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <p className="text-muted-foreground font-medium mb-1">Tanggal Penahanan</p>
                      <p className="font-semibold">{format(item.data.tglPenahanan, 'dd MMMM yyyy', { locale: id })}</p>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <p className="text-muted-foreground font-medium mb-1">Masa Pidana</p>
                      <p className="font-semibold">
                        {item.data.masaPidana.tahun} Tahun {item.data.masaPidana.bulan} Bulan {item.data.masaPidana.hari} Hari
                      </p>
                    </div>
                    {(item.data.remisi.bulan > 0 || item.data.remisi.hari > 0) && (
                      <div className="bg-primary/10 p-3 rounded-lg col-span-2">
                        <p className="text-muted-foreground font-medium mb-1">Remisi yang Diterima</p>
                        <p className="font-semibold text-primary">
                          {item.data.remisi.bulan} Bulan {item.data.remisi.hari} Hari
                        </p>
                      </div>
                    )}
                    <div className="col-span-2 mt-2">
                      <p className="text-xs text-muted-foreground">
                        Klik untuk melihat detail lengkap perhitungan
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}