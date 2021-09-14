//******** Get Date variations ******/
export const dateVariations = (formattedDate) => {
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

// FormateDate according to the ISO format
export const formatDate = (date) => date.toISOString().slice(0, 10)

//******* Get next date ******/
export const getNextDate = (date) => {
  const tomorrow = new Date(date)
  const next = tomorrow.setDate(tomorrow.getDate() + 1)
  return formatDate(new Date(next))
}

export const getTodaysDate = () => formatDate(new Date())

// Find if the given year is leap year or not
// const leapYearChecker = (year) =>
//   (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
