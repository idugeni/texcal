'use client'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFReport } from '@/components/PDFReport'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Info } from 'lucide-react'
import { FormData } from './CalculatorForm'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ResultDisplayProps {
  result: Date | null
  formData: FormData | null
}

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

export function ResultDisplay({ result, formData }: ResultDisplayProps) {
  if (!result || !formData) return null

  return (
    <Card className="border-2 border-primary/20 shadow-md">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center">
          Hasil Perhitungan
          <InfoIcon content="Hasil perhitungan berdasarkan data yang dimasukkan dan ketentuan 2/3 masa pidana" />
        </CardTitle>
        <CardDescription>
          Perhitungan untuk WBP: <span className="font-medium">{formData.namaNapi}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="p-6 bg-primary/10 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Tanggal Potensi Pembebasan:</h3>
          <p className="text-3xl font-bold text-primary">
            {format(result, 'EEEE, dd MMMM yyyy', { locale: id })}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Tanggal ini adalah perkiraan berdasarkan perhitungan 2/3 masa pidana dikurangi remisi
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Data WBP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Nama Lengkap:</h4>
                <p className="font-medium">{formData.namaNapi}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Tanggal Penahanan:</h4>
                <p>{format(formData.tglPenahanan, 'dd MMMM yyyy', { locale: id })}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Data Pidana</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Masa Pidana:</h4>
                <p>
                  {formData.masaPidana.tahun} Tahun, {formData.masaPidana.bulan} Bulan, {formData.masaPidana.hari} Hari
                </p>
              </div>
              {(formData.remisi.bulan > 0 || formData.remisi.hari > 0) && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Remisi:</h4>
                  <p>{formData.remisi.bulan} Bulan, {formData.remisi.hari} Hari</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-4 text-sm">
            <h4 className="font-medium mb-2">Informasi Perhitungan:</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Perhitungan berdasarkan 2/3 dari total masa pidana</li>
              <li>Remisi yang diinput akan mengurangi masa pidana yang harus dijalani</li>
              <li>Hasil perhitungan bersifat perkiraan dan dapat berbeda dengan ketetapan resmi</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
      
      <CardFooter className="bg-muted/20 pt-4">
        <PDFDownloadLink 
          document={
            <PDFReport 
              data={formData} 
              result={result} 
            />
          } 
          fileName={`Perhitungan_PB_${formData.namaNapi.replace(/\s+/g, '_')}_${format(new Date(), 'yyyyMMdd')}.pdf`}
          className="w-full"
        >
          {({ loading }) => (
            <Button 
              className="w-full" 
              variant="outline"
              disabled={loading}
            >
              <Download className="mr-2 h-4 w-4" />
              {loading ? 'Menyiapkan Dokumen...' : 'Unduh Hasil Perhitungan (PDF)'}
            </Button>
          )}
        </PDFDownloadLink>
      </CardFooter>
    </Card>
  )
}