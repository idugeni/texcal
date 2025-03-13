import { NextResponse } from 'next/server';
import { z } from 'zod';
import { convertDurationToDays, calculatePenaltyDuration, addDaysWithLeapYearAdjustment } from '@/lib/utils';

const calculationSchema = z.object({
  tglPenahanan: z.string().datetime(),
  masaPidana: z.object({
    tahun: z.number().min(0),
    bulan: z.number().min(0).max(11),
    hari: z.number().min(0).max(29)
  })
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = calculationSchema.parse(body);
    
    const totalDays = convertDurationToDays(
      validated.masaPidana.tahun,
      validated.masaPidana.bulan,
      validated.masaPidana.hari
    );
    
    const penaltyDays = calculatePenaltyDuration(totalDays);
    const startDate = new Date(validated.tglPenahanan);
    const releaseDate = addDaysWithLeapYearAdjustment(startDate, penaltyDays);

    return NextResponse.json({ 
      success: true,
      releaseDate: releaseDate.toISOString()
    });

  } catch {
    return NextResponse.json({
      success: false,
      error: 'Invalid input parameters'
    }, { status: 400 });
  }
}