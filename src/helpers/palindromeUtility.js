import { dateVariations, getNextDate } from './dateUtility'

//******** Get next palindrome date and the gap in between ******/
export const getNextPalindrome = (date) => {
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
      break
    } else {
      nextDate = getNextDate(nextDate)
    }
  }
  let day = days === 1 ? `1 day` : `${days} days`
  const formatFinal = (date) =>
    new Date(date).toISOString().slice(0, 10).split('-').reverse().join('-')

  return {
    nextDate: `Next  palindrome date: ${formatFinal(nextDate)}`,
    days: `You just missed by ` + day,
  }
}

// Check if the given date is palindrome or not
export const isPalindrome = (date) => date === date.split('').reverse().join('')
