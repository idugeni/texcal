'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFReport } from '@/components/PDFReport'
import { generateExcelReport } from '@/components/ExcelReport'
import { Card, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, ArrowLeft } from 'lucide-react'
import { FormData } from '@/components/telraam/CalculatorForm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { DetailHeader } from '@/components/telraam/DetailHeader'
import { DetailContent as DetailContentComponent } from '@/components/telraam/DetailContent'
import { DetailLoading } from '@/components/telraam/DetailLoading'
import { DetailError } from '@/components/telraam/DetailError'

function DetailContent() {
  const searchParams = useSearchParams()
  const itemId = searchParams.get('id')
  
  const [historyItem, setHistoryItem] = useState<{
    id: string;
    date: Date;
    data: FormData;
    result: Date;
  } | null>(null)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!itemId) {
      setError('ID tidak ditemukan')
      setLoading(false)
      return
    }
    
    const savedHistory = localStorage.getItem('calculationHistory')
    if (!savedHistory) {
      setError('Riwayat perhitungan tidak ditemukan')
      setLoading(false)
      return
    }
    
    try {
      const history = JSON.parse(savedHistory, (key, value) => {
        if (key === 'date' || key === 'result' || key === 'tglPenahanan') {
          return new Date(value)
        }
        return value
      })
      
      const item = history.find((item: { id: string; date: Date; data: FormData; result: Date }) => item.id === itemId)
      if (!item) {
        setError('Data tidak ditemukan')
        setLoading(false)
        return
      }
      
      setHistoryItem(item)
      setLoading(false)
    } catch (error) {
      console.error('Error loading calculation history:', error)
      setError('Terjadi kesalahan saat memuat data')
      setLoading(false)
    }
  }, [itemId])
  
  if (loading) {
    return <DetailLoading />
  }
  
  if (error || !historyItem) {
    return <DetailError error={error} />
  }
  
  const { data, result } = historyItem
  
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
        
        <Card className="border-2 border-primary/20 shadow-md">
          <DetailHeader data={data} date={historyItem.date} />
          <DetailContentComponent data={data} result={result} />
          
          <CardFooter className="bg-muted/20 p-6">
            <div className="w-full flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => generateExcelReport({ data, result })}
              >
                <Download className="h-4 w-4 mr-2" />
                Unduh Excel
              </Button>
              <PDFDownloadLink
                document={<PDFReport data={data} result={result} />}
                fileName={`laporan-${data.namaNapi.toLowerCase().replace(/\s+/g, '-')}.pdf`}
              >
                {({ loading }) => (
                  <Button disabled={loading}>
                    <Download className="h-4 w-4 mr-2" />
                    {loading ? 'Menyiapkan PDF...' : 'Unduh PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

export default function DetailPage() {
  return (
    <Suspense fallback={<DetailLoading />}>
      <DetailContent />
    </Suspense>
  )
}