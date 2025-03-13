import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDurationToDays(years: number, months: number, days: number): number {
  const averageDaysInMonth = 30.4368;
  return (years * 365) + (months * averageDaysInMonth) + days;
}

export function calculatePenaltyDuration(days: number): number {
  return Math.floor(days * 2 / 3);
}

export function addDaysWithLeapYearAdjustment(startDate: Date, days: number): Date {
  const result = new Date(startDate);
  let remainingDays = days;
  
  while (remainingDays > 0) {
    const currentYear = result.getFullYear();
    const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0;
    const daysInYear = isLeapYear ? 366 : 365;
    
    if (remainingDays > daysInYear) {
      result.setFullYear(currentYear + 1);
      remainingDays -= daysInYear;
    } else {
      result.setDate(result.getDate() + remainingDays);
      remainingDays = 0;
    }
  }
  return result;
}
