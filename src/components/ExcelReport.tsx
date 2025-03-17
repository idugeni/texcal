'use client'

import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { FormData } from '@/components/telraam/CalculatorForm';

interface ExcelReportProps {
  data: FormData;
  result: Date;
}

export function generateExcelReport({ data, result }: ExcelReportProps): void {
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([]);
  
  // Add title
  XLSX.utils.sheet_add_aoa(ws, [
    ['LAPORAN PEMBEBASAN BERSYARAT'],
    ['Dokumen ini berisi informasi perhitungan pembebasan bersyarat berdasarkan ketentuan 2/3 masa pidana'],
    []
  ], { origin: 'A1' });
  
  // Add WBP data
  XLSX.utils.sheet_add_aoa(ws, [
    ['DATA WBP'],
    ['Nama Lengkap:', data.namaNapi],
    ['Tanggal Penahanan:', format(data.tglPenahanan, 'EEEE, dd MMMM yyyy', { locale: idLocale })],
    []
  ], { origin: 'A4' });
  
  // Add sentence data
  XLSX.utils.sheet_add_aoa(ws, [
    ['DATA PIDANA'],
    ['Masa Pidana:', `${data.masaPidana.tahun} Tahun ${data.masaPidana.bulan} Bulan ${data.masaPidana.hari > 0 ? `${data.masaPidana.hari} Hari` : ''}`],
    ['Remisi:', `${data.remisi.bulan} Bulan ${data.remisi.hari > 0 ? `${data.remisi.hari} Hari` : ''}`],
    []
  ], { origin: 'A9' });
  
  // Add release date
  XLSX.utils.sheet_add_aoa(ws, [
    ['TANGGAL POTENSI PEMBEBASAN'],
    [format(result, 'EEEE, dd MMMM yyyy', { locale: idLocale })],
    []
  ], { origin: 'A14' });
  
  // Add footer
  XLSX.utils.sheet_add_aoa(ws, [
    [`Dokumen ini digenerate secara otomatis oleh sistem • ${format(new Date(), 'dd/MM/yyyy', { locale: idLocale })}`]
  ], { origin: 'A18' });
  
  // Set column widths
  const cols = [
    { wch: 25 }, // A
    { wch: 50 }  // B
  ];
  ws['!cols'] = cols;
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Laporan Pembebasan');
  
  // Generate Excel file and trigger download
  XLSX.writeFile(wb, `laporan-${data.namaNapi.toLowerCase().replace(/\s+/g, '-')}.xlsx`);
}