import React, { useState } from 'react'
import { formatDate, dateVariations } from './helpers/dateUtility'
import { getNextPalindrome, isPalindrome } from './helpers/palindromeUtility'

function App() {
  const [birthday, setBirthday] = useState('')
  const [nextPalindrome, setNextPalindrome] = useState({})
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const clearRes = () => {
    setMessage('')
    setNextPalindrome({})
  }

  const addDelay = (message, status, date) =>
    setTimeout(() => {
      // Stop loader
      setLoading(false)
      setMessage(message)
      if (status !== 'success') {
        const upcomingPalindrome = getNextPalindrome(date)
        setNextPalindrome(upcomingPalindrome)
      }
    }, 3000)

  const checkIfPalindrome = () => {
    // Clear prev result
    clearRes()

    // If the birth date is today's date then format the date or else keep the date as is
    const finalDate = birthday instanceof Date ? formatDate(birthday) : birthday

    // Get dateVariations for the current date
    const currentDateVariations = dateVariations(finalDate)

    //**** Check if any of the date variation is palindrome
    const res = currentDateVariations
      .map((date) => isPalindrome(date))
      .some((val) => val === true)

    //****** Loader Logic *******
    // Start Loader
    setMessage('Processing...')
    setLoading(true)

    // Stop loader after 3 seconds

    //****** Set output *******/
    // Set palindrome or not
    if (res) {
      addDelay(
        'Hurray 🥳 your birthday is a palindrome 😄',
        'success',
        finalDate
      )
    } else {
      addDelay('Sorry 😿 your birthday is not a palindrome', 'fail', finalDate)
    }
  }

  return (
    <div className="App">
      <h1>🍰 Palindrome birthday 🎂</h1>
      <div className="container"></div>
      <p>Enter your birth date:</p>
      <input
        min="1950-01-01"
        // max={todaysDate}
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
      <br />
      <div className="loadingContainer">
        <div className={`${loading ? 'loader' : ''}`}></div>
        <h2>{message}</h2>
        <h2>{nextPalindrome.nextDate}</h2>
        <h2>{nextPalindrome.days}</h2>
      </div>
    </div>
  )
}

export default App
