import { createContext, useContext, useState } from "react";

const DateContext = createContext()

export const useDate = () => {
  return useContext(DateContext)
}

export const DateProvider = ({ children }) => {
  const [date, setDate] = useState('')
  return (
    <DateContext.Provider value={{date, setDate}}>
      {children}
    </DateContext.Provider>
  )
}