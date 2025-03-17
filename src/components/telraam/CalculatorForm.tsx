import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addDaysWithLeapYearAdjustment } from '@/lib/utils'
import { Clock, User } from 'lucide-react'
import { DatePicker } from '@/components/ui/date-picker'
import { useViewportAnimation } from '@/hooks/use-viewport-animation'

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
  // Animation hooks for each section with staggered delays
  const formAnimation = useViewportAnimation({ threshold: 0.2, repeat: true });
  const wbpSectionAnimation = useViewportAnimation({ threshold: 0.2, delay: 200, repeat: true });
  const masaPidanaSectionAnimation = useViewportAnimation({ threshold: 0.2, delay: 400, repeat: true });
  const remisiSectionAnimation = useViewportAnimation({ threshold: 0.2, delay: 600, repeat: true });
  const buttonAnimation = useViewportAnimation({ threshold: 0.2, delay: 800, repeat: true });

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
      // Calculate release date using the leap year adjusted function
      const releaseDate = addDaysWithLeapYearAdjustment(data.tglPenahanan, finalDays)

      // Call onCalculationComplete to redirect to detail page
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
    <div 
      ref={formAnimation.ref as React.RefObject<HTMLDivElement>}
      className={`space-y-8 transition-all duration-1000 ${formAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div 
            ref={wbpSectionAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`p-6 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-700 ${wbpSectionAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-lg font-semibold mb-4 text-primary flex items-center">Data WBP</h3>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="namaNapi"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in-50 duration-300">
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
                  <FormItem className="animate-in fade-in-50 duration-300 delay-100">
                    <FormLabel>
                      Tanggal Penahanan
                    </FormLabel>
                    <FormControl>
                      <DatePicker 
                        date={field.value} 
                        setDate={field.onChange}
                        className="transition-all duration-300 focus:border-primary/50 focus:ring-primary/20"
                        showIcon={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div 
            ref={masaPidanaSectionAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`p-6 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-700 ${masaPidanaSectionAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-lg font-semibold mb-4 text-primary flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary/70" />
              Masa Pidana
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="masaPidana.tahun"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-200">
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
                  <FormItem className="animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-300">
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
                  <FormItem className="animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-400">
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

          <div 
            ref={remisiSectionAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`p-6 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-700 ${remisiSectionAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-lg font-semibold mb-4 text-primary">Remisi</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="remisi.bulan"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-500">
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
                  <FormItem className="animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-600">
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

          <div
            ref={buttonAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`w-full transition-all duration-1000 ${buttonAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <Button 
              type="submit" 
              className="w-full text-base py-6 transition-colors hover:bg-primary/90"
            >
              Hitung Masa Pidana
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}