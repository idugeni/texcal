import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Trash2, User } from 'lucide-react'
import Link from 'next/link'
import { HistoryFilter } from '@/components/telraam/HistoryFilter'

interface HistoryItem {
  id: string
  date: Date
  data: {
    namaNapi: string
    tglPenahanan: Date
    masaPidana: {
      tahun: number
      bulan: number
      hari: number
    }
    remisi: {
      bulan: number
      hari: number
    }
  }
  result: Date
}

interface HistoryDisplayProps {
  history: HistoryItem[]
  onClearHistory: () => void
  loadFromHistory?: (historyItem: HistoryItem) => void
}

export function HistoryDisplay({ history, onClearHistory }: HistoryDisplayProps) {
  const [filteredHistory, setFilteredHistory] = useState(history)
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'date' as 'date' | 'name' | 'sentence',
    sortOrder: 'desc' as 'asc' | 'desc'
  })
  
  useEffect(() => {
    let result = [...history]
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(item => 
        item.data.namaNapi.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0
      
      if (filters.sortBy === 'date') {
        comparison = a.date.getTime() - b.date.getTime()
      } else if (filters.sortBy === 'name') {
        comparison = a.data.namaNapi.localeCompare(b.data.namaNapi)
      } else if (filters.sortBy === 'sentence') {
        const aTotalDays = (a.data.masaPidana.tahun * 365) + (a.data.masaPidana.bulan * 30) + a.data.masaPidana.hari
        const bTotalDays = (b.data.masaPidana.tahun * 365) + (b.data.masaPidana.bulan * 30) + b.data.masaPidana.hari
        comparison = aTotalDays - bTotalDays
      }
      
      return filters.sortOrder === 'asc' ? comparison : -comparison
    })
    
    setFilteredHistory(result)
  }, [history, filters])
  
  const handleFilterChange = (newFilters: {
    search: string;
    sortBy: 'date' | 'name' | 'sentence';
    sortOrder: 'asc' | 'desc';
  }) => {
    setFilters(newFilters)
  }
  
  if (history.length === 0) {
    return (
      <Card className="border border-border/50 shadow-sm animate-in fade-in-50 duration-500">
        <CardHeader className="text-center">
          <div className="mx-auto p-4 bg-muted/30 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Riwayat Kosong</CardTitle>
          <CardDescription className="text-base mt-2">Belum ada perhitungan yang disimpan</CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-muted-foreground">Lakukan perhitungan masa pidana untuk melihat riwayat di sini</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-primary">Riwayat Perhitungan</h3>
        <Button variant="destructive" size="sm" onClick={onClearHistory} className="hover:bg-destructive/90 transition-all duration-300">
          <Trash2 className="h-4 w-4 mr-2" />
          Hapus Riwayat
        </Button>
      </div>
      
      <HistoryFilter onFilterChange={handleFilterChange} />

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {filteredHistory.map((item, index) => (
          <Card 
            key={item.id} 
            className="hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden animate-in fade-in-50 slide-in-from-bottom-5 duration-700 relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link href={`/telraam/detail?id=${item.id}`} className="block h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none rounded-lg"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-4 w-4 text-primary/70" />
                      {item.data.namaNapi}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {format(item.date, 'dd MMMM yyyy • HH:mm', { locale: idLocale })}
                    </CardDescription>
                  </div>
                  <div className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-md">
                    {item.data.masaPidana.tahun}T {item.data.masaPidana.bulan}B
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Tanggal Penahanan
                    </div>
                    <p className="font-medium text-sm">
                      {format(item.data.tglPenahanan, 'dd MMMM yyyy', { locale: idLocale })}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                      <Clock className="h-3.5 w-3.5" />
                      Remisi
                    </div>
                    <p className="font-medium text-sm">
                      {item.data.remisi.bulan} Bulan {item.data.remisi.hari > 0 ? `${item.data.remisi.hari} Hari` : ''}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-2 relative z-10 border-t border-primary/10">
                <div className="w-full">
                  <p className="text-xs text-muted-foreground mb-1">Tanggal Potensi Pembebasan</p>
                  <p className="font-semibold text-primary text-base">
                    {format(item.result, 'EEEE, dd MMMM yyyy', { locale: idLocale })}
                  </p>
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}