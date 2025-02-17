import React from 'react'
import { createContext } from 'react'

export const UserContext = createContext();

export function UserContextProvider(props) {
    const value = {namee:"noureddine"}
  return (
    <UserContext.Provider value={value}>
        {props.children}
    </UserContext.Provider>
  )
}

