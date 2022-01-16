import { useState } from 'react'
import styles from './calculator.module.css'

const INITIAL_DATE = '2022-01-01'

export const Calculator = () => {
  const [date, setDate] = useState(INITIAL_DATE)
  const handleSelectDate = (e: Event) => {
    const dateValue = e.target.value
    setDate(dateValue)
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
    </div>
  )
}