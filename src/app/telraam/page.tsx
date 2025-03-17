'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CalculatorForm, FormData } from '@/components/telraam/CalculatorForm'
import { HistoryDisplay } from '@/components/telraam/HistoryDisplay'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useViewportAnimation } from '@/hooks/use-viewport-animation'

export default function TelraamPage() {
  // Animation hooks for tab content - initialize with isInView true to prevent disappearing content
  const calculatorTabAnimation = useViewportAnimation({ threshold: 0.1, repeat: false, delay: 100, initiallyVisible: true })
  const historyTabAnimation = useViewportAnimation({ threshold: 0.1, repeat: false, delay: 100, initiallyVisible: true })
  const router = useRouter()
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    id: string;
    date: Date;
    data: FormData;
    result: Date;
  }>>([]);

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
    router.push(`/telraam/detail?id=${newHistoryItem.id}`)
  }

  const clearHistory = () => {
    setCalculationHistory([])
    localStorage.removeItem('calculationHistory')
  }

  const loadFromHistory = (historyItem: typeof calculationHistory[0]) => {
    router.push(`/telraam/detail?id=${historyItem.id}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-2 animate-in fade-in-50 duration-500 bg-clip-text bg-gradient-to-r from-primary to-primary/70 text-transparent">Telraam Masa Pidana</h1>
        <p className="text-center text-muted-foreground mb-8 animate-in fade-in-50 duration-500 delay-200">Perhitungan akurat untuk masa pidana dan potensi pembebasan</p>
        
        <div className="bg-card rounded-xl border border-border/50 shadow-sm p-1 mb-8 animate-in fade-in-50 duration-500 delay-300">
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="calculator" className="data-[state=active]:bg-primary/10">
                Kalkulator
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-primary/10">
                Riwayat
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="p-4">
              <div 
                ref={calculatorTabAnimation.ref as React.RefObject<HTMLDivElement>}
                className={`transition-all duration-700 ${calculatorTabAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                <CalculatorForm onCalculationComplete={handleCalculationComplete} />
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="p-4">
              <div 
                ref={historyTabAnimation.ref as React.RefObject<HTMLDivElement>}
                className={`transition-all duration-700 ${historyTabAnimation.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                <HistoryDisplay 
                  history={calculationHistory} 
                  onClearHistory={clearHistory} 
                  loadFromHistory={loadFromHistory} 
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}