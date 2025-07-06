import React, { createContext } from 'react'


export const AppContext = createContext();

export const AppContextProvide = ({children}) => {
  
 const value = 10

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}


