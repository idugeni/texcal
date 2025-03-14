'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import { convertDurationToDays, calculatePenaltyDuration, addDaysWithLeapYearAdjustment } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardContent } from '@/components/ui/card'

// Form schema definition
export const formSchema = z.object({
  namaNapi: z.string().min(3, "Nama harus diisi minimal 3 karakter").max(100, "Nama terlalu panjang"),
  tglPenahanan: z.date({
    required_error: "Tanggal penahanan harus diisi",
  }),
  masaPidana: z.object({
    tahun: z.coerce.number().min(0, "Nilai tidak boleh negatif"),
    bulan: z.coerce.number().min(0, "Nilai tidak boleh negatif").max(11, "Maksimal 11 bulan"),
    hari: z.coerce.number().min(0, "Nilai tidak boleh negatif").max(29, "Maksimal 29 hari")
  }),
  remisi: z.object({
    bulan: z.coerce.number().min(0, "Nilai tidak boleh negatif").max(11, "Maksimal 11 bulan"),
    hari: z.coerce.number().min(0, "Nilai tidak boleh negatif").max(29, "Maksimal 29 hari")
  })
}).refine(data => {
  // Pastikan setidaknya ada satu nilai masa pidana yang tidak nol
  return data.masaPidana.tahun > 0 || data.masaPidana.bulan > 0 || data.masaPidana.hari > 0;
}, {
  message: "Masa pidana tidak boleh kosong",
  path: ["masaPidana"]
});

// Type for form data
export type FormData = z.infer<typeof formSchema>;

// Props interface
interface CalculatorFormProps {
  onCalculationComplete: (data: FormData, result: Date) => void;
}

// Helper component for form field with tooltip
const InfoTooltip = ({ content }: { content: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function CalculatorForm({ onCalculationComplete }: CalculatorFormProps) {
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaNapi: "",
      masaPidana: { tahun: 0, bulan: 0, hari: 0 },
      remisi: { bulan: 0, hari: 0 }
    }
  });

  const onSubmit = (data: FormData) => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      try {
        // Calculate total days of sentence
        const totalDays = convertDurationToDays(
          data.masaPidana.tahun,
          data.masaPidana.bulan,
          data.masaPidana.hari
        );
        
        // Calculate penalty days (2/3 of total)
        const penaltyDays = calculatePenaltyDuration(totalDays);
        
        // Apply remission if any
        const remissionDays = data.remisi.bulan * 30 + data.remisi.hari;
        const finalDays = Math.max(0, penaltyDays - remissionDays);
        
        // Calculate release date
        const start = new Date(data.tglPenahanan);
        const releaseDate = addDaysWithLeapYearAdjustment(start, finalDays);
        
        // Call the callback with the result
        onCalculationComplete(data, releaseDate);
        
        toast.success("Perhitungan Berhasil", {
          description: "Hasil perhitungan telah ditampilkan",
        });
      } catch (error) {
        console.error('Calculation error:', error);
        toast.error("Terjadi Kesalahan", {
          description: "Gagal melakukan perhitungan. Silakan coba lagi.",
        });
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6 border-primary/10">
          <CardContent className="p-0 space-y-4">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Data Warga Binaan Pemasyarakatan</h3>
              <InfoTooltip content="Masukkan data identitas Warga Binaan Pemasyarakatan yang akan dihitung masa pidananya" />
            </div>
            
            <FormField
              control={form.control}
              name="namaNapi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap WBP</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama lengkap..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="p-6 border-primary/10">
          <CardContent className="p-0 space-y-4">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Tanggal Penahanan</h3>
              <InfoTooltip content="Pilih tanggal awal penahanan sesuai dengan putusan pengadilan" />
            </div>
            
            <FormField
              control={form.control}
              name="tglPenahanan"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border mx-auto"
                      disabled={(date) => date > new Date()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="p-6 border-primary/10">
          <CardContent className="p-0 space-y-4">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Masa Pidana</h3>
              <InfoTooltip content="Masukkan masa pidana sesuai dengan putusan pengadilan yang telah berkekuatan hukum tetap" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="masaPidana.tahun"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="masaPidana.bulan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bulan</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="masaPidana.hari"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="29" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 border-primary/10">
          <CardContent className="p-0 space-y-4">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Remisi (Opsional)</h3>
              <InfoTooltip content="Masukkan total remisi yang telah diterima oleh WBP, jika ada" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="remisi.bulan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bulan</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remisi.hari"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="29" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menghitung...
            </>
          ) : (
            'Hitung Pembebasan Bersyarat'
          )}
        </Button>
      </form>
    </Form>
  );
}