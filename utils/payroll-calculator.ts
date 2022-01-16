import { PayrollDate } from '../types'

export function getPayrollDates(dateValue: string): PayrollDate[] {
  const dateObject: Date = new Date(dateValue)

  let allDates: PayrollDate[] = []
  for(let i = 1; i <= 12; i++) {
    
    const dates = {
      salaryDate: `Dummy salary ${i}`,
      bonusDate: `Dummy bonus ${i}`,
    }
    
    allDates.push(dates)
  }
  return allDates
}