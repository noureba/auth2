import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider(props) {

  const [user, setUser] = useState();

 

  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
