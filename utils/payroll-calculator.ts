import { PayrollDate } from '../types'

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
      salaryDate: currentMonthSalaryDate.toString().slice(0,15),
      bonusDate: currentMonthBonusDate.toString().slice(0,15),
    }
    
    allDates.push(dates)
  }
  return allDates
}