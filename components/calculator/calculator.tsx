import { useState } from 'react'
import styles from './calculator.module.css'

import { getPayrollDates } from '../../utils'
import { PayrollDate } from '../../types'

const INITIAL_DATE = '2022-01-01'

export const Calculator = () => {
  const [date, setDate] = useState(INITIAL_DATE)
  const [payrollDates, setPayrollDates] = useState<PayrollDate[]>([])

  const handleSelectDate = (e: Event) => {
    const dateValue = e.target.value
    setDate(dateValue)

    const payrollDates = getPayrollDates(dateValue)
    setPayrollDates(payrollDates)
  }

  const handleCSVExport = () => {
    // TODO: refactoring opportunity to abstract business logic / use other packages to avoid building from scratch
    const csvHeader = 'Salary date,Bonus date\r\n'
    const header = Object.keys(payrollDates[0])
    const csvData = payrollDates.map((dates: PayrollDate) => header?.map(fieldName => dates[fieldName])).join('\r\n')

    const csv = csvHeader + csvData
    const csvFile = new Blob([csv], {type: "text/csv"})
    const exportURL = URL.createObjectURL(csvFile)
    
    window.location.assign(exportURL)
  }

  return (
    <div className={styles.container}>
      <h2>
        Get started by entering the start date
      </h2>
      <p>Your chosen date will calculate the payroll dates for salaries and bonuses for your sales staff.</p>
      <p><strong>Base salaries</strong> will be paid on the last day of each month. If the payroll date falls on the weekend, then the staff will be paid on the Friday before the weekend.</p>
      <p><strong>Bonuses</strong> will be paid on the 15th of each month for the previous month. If the payroll date falls on the weekend, then the staff will be paid on the first Wednesday after the weekend.</p>
      <input type="date" value={date} onChange={handleSelectDate} />
      <p>Selected start date: {date}</p>
        <table className={styles.tableContainer}>
          <thead>
            <tr>
              <th>Salary date</th>
              <th>Bonus date</th>            
            </tr>          
          </thead>
          <tbody>
            {payrollDates.length > 0 && payrollDates.map((dates: PayrollDate, key) => (
              <tr key={key}>
                <td>{dates.salaryDate}</td>
                <td>{dates.bonusDate}</td>                
              </tr>
            ))}
          </tbody>        
        </table>
        {payrollDates.length > 0 && <button className={styles.csvButton} onClick={handleCSVExport}>Export as CSV</button>}
    </div>
  )
}