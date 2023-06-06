import { createContext, useContext, useState, useEffect } from "react";

const DateContext = createContext()

export const useDate = () => {
  return useContext(DateContext)
}

export const DateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date())

  useEffect (() => {
    setDate(new Date())
    console.log(date)
  }, [])

  return (
    <DateContext.Provider value={{date, setDate}}>
      {children}
    </DateContext.Provider>
  )
}

/// Date display:
// const date = new Date();

// const options = {
//   weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
// };

// console.log(date.toLocaleString('en_AU', options))