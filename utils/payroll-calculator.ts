import { PayrollDate } from '../types'

const isSaturday = (date: Date): boolean => {
  return date.toString().includes('Sat')
}

const isSunday = (date: Date): boolean => {
  return date.toString().includes('Sun')
}

export function calibrateSalaryForWeekend(date: Date): string {
  if(isSaturday(date)) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).toString().slice(0,15)
  } else if(isSunday(date)) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2).toString().slice(0,15)
  } else {
  return date.toString().slice(0,15)
  }
}

export function calibrateBonusForWeekend(date: Date): string {
  if(isSaturday(date)) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4).toString().slice(0,15)
  } else if(isSunday(date)) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3).toString().slice(0,15)
  } else {
  return date.toString().slice(0,15)
  }
}

export function getPayrollDates(dateValue: string): PayrollDate[] {
  const dateObject: Date = new Date(dateValue)

  let allDates: PayrollDate[] = []
  for(let i = 0; i <= 11; i++) {
    // TODO: optimisation opportunity for handling end of month edge cases (29th, 30th)
    const currentMonth = new Date(dateObject.getFullYear(), dateObject.getMonth() + i, dateObject.getDate())

    // end of month date (/the day before the first of next month)
    const currentMonthSalaryDate = new Date((new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)) - 1);

    // 15th of following month
    const currentMonthBonusDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 15);

    const dates = {
      salaryDate: calibrateSalaryForWeekend(currentMonthSalaryDate),
      bonusDate: calibrateBonusForWeekend(currentMonthBonusDate),
    }
    
    allDates.push(dates)
  }
  return allDates
}