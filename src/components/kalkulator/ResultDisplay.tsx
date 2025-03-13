'use client'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFReport } from '@/components/PDFReport'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { FormData } from './CalculatorForm'

interface ResultDisplayProps {
  result: Date | null
  formData: FormData | null
}

export function ResultDisplay({ result, formData }: ResultDisplayProps) {
  if (!result || !formData) return null

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle>Hasil Perhitungan</CardTitle>
        <CardDescription>
          Berdasarkan data yang dimasukkan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-primary/10 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Tanggal Potensi Pembebasan:</h3>
          <p className="text-2xl font-bold text-primary">
            {format(result, 'EEEE, dd MMMM yyyy', { locale: id })}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Tanggal Penahanan:</h4>
            <p>{format(formData.tglPenahanan, 'dd MMMM yyyy', { locale: id })}</p>
          </div>
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
        </div>

        <div className="mt-6">
          <PDFDownloadLink 
            document={
              <PDFReport 
                data={formData} 
                result={result} 
              />
            } 
            fileName={`Perhitungan_PB_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`}
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
        </div>
      </CardContent>
    </Card>
  )
}