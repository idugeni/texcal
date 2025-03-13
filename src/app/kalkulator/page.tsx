'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalculatorForm, FormData } from '@/components/kalkulator/CalculatorForm'
import { ResultDisplay } from '@/components/kalkulator/ResultDisplay'
import { HistoryDisplay } from '@/components/kalkulator/HistoryDisplay'

export default function KalkulatorPage() {
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    id: string;
    date: Date;
    data: FormData;
    result: Date;
  }>>([]);

  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);
  const [result, setResult] = useState<Date | null>(null);

  // Load calculation history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculationHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory, (key, value) => {
          // Convert date strings back to Date objects
          if (key === 'date' || key === 'result' || key === 'tglPenahanan') {
            return new Date(value);
          }
          return value;
        });
        setCalculationHistory(parsed);
      } catch (error) {
        console.error('Error loading calculation history:', error);
      }
    }
  }, []);

  const handleCalculationComplete = (data: FormData, releaseDate: Date) => {
    setCurrentFormData(data);
    setResult(releaseDate);
    
    // Save to calculation history
    const newHistoryItem = {
      id: Date.now().toString(),
      date: new Date(),
      data: {...data},
      result: releaseDate
    };
    
    const updatedHistory = [newHistoryItem, ...calculationHistory].slice(0, 10); // Keep only last 10 calculations
    setCalculationHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem('calculationHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setCalculationHistory([]);
    localStorage.removeItem('calculationHistory');
    toast.success("Riwayat Dihapus", {
      description: "Semua riwayat perhitungan telah dihapus",
    });
  };

  const loadFromHistory = (historyItem: typeof calculationHistory[0]) => {
    setCurrentFormData(historyItem.data);
    setResult(historyItem.result);
    
    toast.success("Data Dimuat", {
      description: "Data dari riwayat telah dimuat ke form",
    });
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Kalkulator Masa Pidana</h1>
      
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="calculator">Kalkulator</TabsTrigger>
          <TabsTrigger value="history">Riwayat Perhitungan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-8">
          <CalculatorForm onCalculationComplete={handleCalculationComplete} />
          
          {result && currentFormData && (
            <ResultDisplay result={result} formData={currentFormData} />
          )}
        </TabsContent>
        
        <TabsContent value="history">
          <HistoryDisplay 
            history={calculationHistory}
            onClearHistory={clearHistory}
            onLoadFromHistory={loadFromHistory}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}