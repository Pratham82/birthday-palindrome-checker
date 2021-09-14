import React, { useState } from 'react'

function App() {
  const [birthday, setBirthday] = useState('')
  const [nextPalindrome, setNextPalindrome] = useState('')
  const [success, setSuccess] = useState(true)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  //******** Get Date variations ******/
  const dateVariations = (formattedDate) => {
    // Date variations
    // DD-MM-YYYY, MM-DD-YYYY, YYYY-MM-DD, DD-MM-YY, MM-DD-YY, YY-MM-DD
    /*
    01012021

    */
    const joinArray = (arr) => arr.join('')

    const [yyyy, mm, dd] = formattedDate.split('-')

    const dateVariations = [
      [dd, mm, yyyy],
      [mm, dd, yyyy],
      [yyyy, mm, dd],
      [dd, mm, yyyy.slice(-2)],
      [mm, dd, yyyy.slice(-2)],
      [yyyy.slice(-2), mm, dd],
    ].map((arr) => joinArray(arr))

    return dateVariations
  }

  const formatDate = (date) => date.toISOString().slice(0, 10)

  const addDelay = (message, date) =>
    setTimeout(() => {
      // Stop loader
      setLoading(false)
      setMessage(message)
      const upcomingPalindrome = getNextPalindrome(date)
      setNextPalindrome(upcomingPalindrome)
    }, 3000)

  //******* Get next date ******/
  const getNextDate = (date) => {
    const tomorrow = new Date(date)
    const next = tomorrow.setDate(tomorrow.getDate() + 1)
    return formatDate(new Date(next))
  }

  //******** Get next palindrome date and the gap in between ******/
  const getNextPalindrome = (date) => {
    let nextDate = getNextDate(date)
    let days = 0
    while (1) {
      // Increase day count after each iteration
      days++

      // Get Date variations for next date
      let currentDateVariations = dateVariations(nextDate)

      // Check if the the date is palindrome in one of the date variations
      let palindromeFound = currentDateVariations
        .map((date) => isPalindrome(date))
        .some((val) => val === true)

      if (palindromeFound) {
        console.log(nextDate)
        break
      } else {
        nextDate = getNextDate(nextDate)
      }
    }
    return { nextDate, days }
  }

  const isPalindrome = (bDate) => bDate === bDate.split('').reverse().join('')

  const checkIfPalindrome = () => {
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
      setSuccess(true)
      addDelay('Hurray your birthday is a palindrome 😄', finalDate)
    } else {
      addDelay('Sorry your birthday is not a palindrome 😢', finalDate)
    }
    // res
    //   ? addDelay('Hurray your birthday is a palindrome 😄')
    //   : addDelay('Sorry your birthday is not a palindrome 😢', finalDate)
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
        <h2>
          {!success
            ? `Next palindrome birthday is  ${nextPalindrome.nextDate}, you just missed it by ${nextPalindrome.days} days 😞`
            : ''}
        </h2>
      </div>
    </div>
  )
}

export default App
