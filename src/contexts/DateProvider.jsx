import { createContext, useContext, useState, useEffect } from "react";

const DateContext = createContext()

export const useDate = () => {
  return useContext(DateContext)
}

export const DateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date())

  useEffect (() => {
    setDate(new Date())
  }, [])

  return (
    <DateContext.Provider value={{date, setDate}}>
      {children}
    </DateContext.Provider>
  )
}