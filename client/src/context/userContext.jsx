import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const backendUrl = import.meta.env.VITE_API_URL;

 

  const info = async () => {
    const { data } = await axios.get(backendUrl + "/api/auth/data", {withCredentials:true});
    if(data.success){
      setUser(data.user)
      setLogin(true)
    }else{
      setUser(null)
      setLogin(false)
    }
  }
  info()

  const value = { user, setUser, login, setLogin, backendUrl };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
