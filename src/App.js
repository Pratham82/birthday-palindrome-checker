import React, { useState } from 'react'

function App() {
  const [birthday, setBirthday] = useState(new Date())
  const [luckyNumber, setLuckyNumber] = useState('')
  const [message, setMessage] = useState('')

  /**
   *
   * @param {date string (DD-MM-YYYY )} birthday
   * @returns date string without any separators (DDMMYYYY)
   */
  const birthDateConvert = (birthday) => {
    console.log(birthday)
    return {
      normalDate: birthday.split('-').join(''),
      reversedDate: birthday.split('-').reverse().join(''),
    }
  }

  /**
   *
   * @param {date string } date
   * @returns date with iso string len = 10
   */
  const formatDate = (date) => date.toISOString().slice(0, 10)

  const todaysDate = formatDate(new Date())

  /**
   * returns palindrome message
   */
  const checkIfPalindrome = () => {
    // If the birth date is today's date then format the date or else keep the date as is
    const finalDate = birthday instanceof Date ? formatDate(birthday) : birthday

    // Pass date which is in the DD-MM-YYYY format and
    const { normalDate, reversedDate } = birthDateConvert(finalDate)

    console.log(normalDate)
    console.log(reversedDate)
    // Set palindrome or not
    normalDate === reversedDate
      ? setMessage('Hurray your birthday is a palindrome 😄')
      : setMessage('Sorry your birthday is not a palindrome 😢')
  }

  return (
    <div className="App">
      <h1>🍰 Palindrome birthday 🎂</h1>
      <div className="container"></div>
      <p>Enter your birth date:</p>
      <input
        min="1950-01-01"
        max={todaysDate}
        type="date"
        value={birthday}
        className="datePickerStyle"
        onChange={(e) => setBirthday(e.target.value)}
      />
      <br />
      <br />
      {birthday && (
        <button className="checkIfLuckyBtn" onClick={checkIfPalindrome}>
          Check Number
        </button>
      )}
      <br />
      <p>{message}</p>
    </div>
  )
}

export default App
