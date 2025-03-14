'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFReport } from '@/components/PDFReport'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, ArrowLeft, Info } from 'lucide-react'
import { FormData } from '@/components/kalkulator/CalculatorForm'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

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
    
    // Load calculation history from localStorage
    const savedHistory = localStorage.getItem('calculationHistory')
    if (!savedHistory) {
      setError('Riwayat perhitungan tidak ditemukan')
      setLoading(false)
      return
    }
    
    try {
      const history = JSON.parse(savedHistory, (key, value) => {
        // Convert date strings back to Date objects
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
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <div className="flex-1 container max-w-5xl mx-auto py-8 px-4 flex items-center justify-center">
          <p className="text-lg">Memuat data...</p>
        </div>
        <Footer />
      </div>
    )
  }
  
  if (error || !historyItem) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
          <div className="mb-6">
            <Link href="/kalkulator">
              <Button variant="ghost" className="flex items-center text-primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Kalkulator
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
              <p>Silakan kembali ke halaman kalkulator dan coba lagi.</p>
            </CardContent>
            <CardFooter className="bg-muted/20 pt-4">
              <Link href="/kalkulator" className="w-full">
                <Button className="w-full">Kembali ke Kalkulator</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }
  
  const { data, result } = historyItem
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/kalkulator">
            <Button variant="ghost" className="flex items-center text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Kalkulator
            </Button>
          </Link>
        </div>
        
        <Card className="border-2 border-primary/20 shadow-md">
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
                {format(historyItem.date, 'dd/MM/yyyy • HH:mm', { locale: idLocale })}
              </p>
            </div>
          </CardHeader>
          
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
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-center">Data WBP</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-center">Data Pidana</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Masa Pidana</h4>
                    <p className="font-semibold text-lg text-primary">
                      {data.masaPidana.tahun} Tahun {data.masaPidana.bulan} Bulan
                    </p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Remisi</h4>
                    <p className="font-semibold text-lg text-primary">
                      {data.remisi.bulan} Bulan {data.remisi.hari} Hari
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          
          <CardFooter className="bg-muted/20 p-6">
            <PDFDownloadLink
              document={<PDFReport data={data} result={result} />}
              fileName={`perhitungan-${data.namaNapi.toLowerCase().replace(/\s+/g, '-')}.pdf`}
              className="w-full"
            >
              {({ loading }) => (
                <Button className="w-full" disabled={loading}>
                  <Download className="h-4 w-4 mr-2" />
                  {loading ? 'Menyiapkan PDF...' : 'Unduh PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4 flex items-center justify-center">
        <p className="text-lg">Memuat data...</p>
      </div>
      <Footer />
    </div>}>
      <DetailContent />
    </Suspense>
  )
}