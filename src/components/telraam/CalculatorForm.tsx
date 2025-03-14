import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addDays, format } from 'date-fns'
import { ResultDisplay } from '@/components/telraam/ResultDisplay'
import { useState } from 'react'
import { CalendarDays, Clock, User } from 'lucide-react'

export type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
  namaNapi: z.string().min(1, 'Nama WBP harus diisi').max(100, 'Nama WBP terlalu panjang'),
  tglPenahanan: z.date({
    required_error: 'Tanggal penahanan harus diisi',
  }).refine((date) => date <= new Date(), {
    message: 'Tanggal penahanan tidak boleh lebih dari hari ini'
  }),
  masaPidana: z.object({
    tahun: z.coerce.number().min(0, 'Tahun tidak boleh negatif').max(100, 'Tahun tidak boleh lebih dari 100').int(),
    bulan: z.coerce.number().min(0, 'Bulan tidak boleh negatif').max(11, 'Bulan tidak boleh lebih dari 11').int(),
    hari: z.coerce.number().min(0, 'Hari tidak boleh negatif').max(30, 'Hari tidak boleh lebih dari 30').int()
  }),
  remisi: z.object({
    bulan: z.coerce.number().min(0, 'Bulan remisi tidak boleh negatif').max(120, 'Bulan remisi tidak boleh lebih dari 120').int(),
    hari: z.coerce.number().min(0, 'Hari remisi tidak boleh negatif').max(30, 'Hari remisi tidak boleh lebih dari 30').int()
  })
})

interface CalculatorFormProps {
  onCalculationComplete: (data: FormData, releaseDate: Date) => void
}

export function CalculatorForm({ onCalculationComplete }: CalculatorFormProps) {
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<Date | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaNapi: '',
      tglPenahanan: new Date(),
      masaPidana: {
        tahun: 1,
        bulan: 0,
        hari: 0
      },
      remisi: {
        bulan: 0,
        hari: 0
      }
    },
  })

  function onSubmit(data: FormData) {
    try {
      // Convert masa pidana to days
      const totalDays = (data.masaPidana.tahun * 365) + (data.masaPidana.bulan * 30) + data.masaPidana.hari
      // Calculate 2/3 of the sentence
      const twoThirdsDays = Math.ceil((totalDays * 2) / 3)
      // Calculate remission in days
      const remisiDays = (data.remisi.bulan * 30) + data.remisi.hari
      // Subtract remission days
      const finalDays = Math.max(0, twoThirdsDays - remisiDays)
      // Calculate release date
      const releaseDate = addDays(data.tglPenahanan, finalDays)

      setResult(releaseDate)
      setShowResult(true)
      onCalculationComplete(data, releaseDate)
    } catch (error) {
      console.error('Error calculating release date:', error)
      form.setError('root', {
        type: 'manual',
        message: 'Terjadi kesalahan saat menghitung tanggal bebas'
      })
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="p-6 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-primary flex items-center">Data WBP</h3>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="namaNapi"
                render={({ field }) => (
                  <FormItem className="animate-in slide-in-from-left duration-300">
                    <FormLabel className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Nama WBP
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Masukkan nama WBP" 
                        {...field} 
                        className="transition-all duration-300 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tglPenahanan"
                render={({ field }) => (
                  <FormItem className="animate-in slide-in-from-right duration-300 delay-100">
                    <FormLabel className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      Tanggal Penahanan
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={format(field.value, 'yyyy-MM-dd')}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        className="transition-all duration-300 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-primary flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary/70" />
              Masa Pidana
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="masaPidana.tahun"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in-50 duration-300 delay-200">
                    <FormLabel>Tahun</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0} 
                        max={100} 
                        {...field} 
                        className="transition-all duration-300 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="masaPidana.bulan"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in-50 duration-300 delay-300">
                    <FormLabel>Bulan</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0} 
                        max={11} 
                        {...field} 
                        className="transition-all duration-300 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="masaPidana.hari"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in-50 duration-300 delay-400">
                    <FormLabel>Hari</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0} 
                        max={30} 
                        {...field} 
                        className="transition-all duration-300 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-primary">Remisi</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="remisi.bulan"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in-50 duration-300 delay-500">
                    <FormLabel>Bulan</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0} 
                        max={120} 
                        {...field} 
                        className="transition-all duration-300 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remisi.hari"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in-50 duration-300 delay-600">
                    <FormLabel>Hari</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0} 
                        max={30} 
                        {...field} 
                        className="transition-all duration-300 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full text-base py-6 animate-in fade-in-50 duration-300 delay-700 hover:scale-[1.02] transition-transform"
          >
            Hitung Masa Pidana
          </Button>
        </form>
      </Form>

      {showResult && result && <ResultDisplay date={result} />}
    </div>
  )
}