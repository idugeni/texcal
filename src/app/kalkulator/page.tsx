'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalculatorForm, FormData } from '@/components/kalkulator/CalculatorForm'
import { HistoryDisplay } from '@/components/kalkulator/HistoryDisplay'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function KalkulatorPage() {
  const router = useRouter()
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    id: string;
    date: Date;
    data: FormData;
    result: Date;
  }>>([])

  // Load calculation history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculationHistory')
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory, (key, value) => {
          // Convert date strings back to Date objects
          if (key === 'date' || key === 'result' || key === 'tglPenahanan') {
            return new Date(value)
          }
          return value
        })
        setCalculationHistory(parsed)
      } catch (error) {
        console.error('Error loading calculation history:', error)
      }
    }
  }, [])

  const handleCalculationComplete = (data: FormData, releaseDate: Date) => {
    // Save to calculation history
    const newHistoryItem = {
      id: Date.now().toString(),
      date: new Date(),
      data: {...data},
      result: releaseDate
    }
    
    const updatedHistory = [newHistoryItem, ...calculationHistory].slice(0, 10) // Keep only last 10 calculations
    setCalculationHistory(updatedHistory)
    
    // Save to localStorage
    localStorage.setItem('calculationHistory', JSON.stringify(updatedHistory))

    // Navigate to detail page
    router.push(`/kalkulator/detail?id=${newHistoryItem.id}`)
  }

  const clearHistory = () => {
    setCalculationHistory([])
    localStorage.removeItem('calculationHistory')
    toast.success("Riwayat Dihapus", {
      description: "Semua riwayat perhitungan telah dihapus",
    })
  }

  const loadFromHistory = (historyItem: typeof calculationHistory[0]) => {
    router.push(`/kalkulator/detail?id=${historyItem.id}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Kalkulator Masa Pidana</h1>
        
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="calculator">Kalkulator</TabsTrigger>
            <TabsTrigger value="history">Riwayat Perhitungan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-8">
            <CalculatorForm onCalculationComplete={handleCalculationComplete} />
          </TabsContent>
          
          <TabsContent value="history">
            <HistoryDisplay 
              history={calculationHistory}
              onClearHistory={clearHistory}
              loadFromHistory={loadFromHistory}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  )
}