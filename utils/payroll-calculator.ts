import { PayrollDate } from '../types'

const isSaturday = (date: Date): boolean => {
  return date.toString().includes('Sat')
}

const isSunday = (date: Date): boolean => {
  return date.toString().includes('Sun')
}

const convertDateToReadableString = (date: Date): string => {
  return date.toString().slice(0,15)
}

export function calibrateSalaryForWeekend(date: Date): string {
  if(isSaturday(date)) {
    const calibratedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
    return convertDateToReadableString(calibratedDate)
  } else if(isSunday(date)) {
    const calibratedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2)
    return convertDateToReadableString(calibratedDate)
  } else {
    return convertDateToReadableString(date)
  }
}

export function calibrateBonusForWeekend(date: Date): string {
  if(isSaturday(date)) {
    const calibratedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4)
    return convertDateToReadableString(calibratedDate)
  } else if(isSunday(date)) {
    const calibratedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3)
    return convertDateToReadableString(calibratedDate)
  } else {
    return convertDateToReadableString(date)
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