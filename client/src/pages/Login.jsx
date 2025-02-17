import React, { useState, useContext } from 'react'
import axios from "axios"
import { UserContext } from '../context/userContext'


function Login() {
  const {namee} = useContext(UserContext)
  
  const [state, setState]= useState("register")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log(namee)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({name, email, password})
    try {
      if(state == "register"){
        const {data} = await axios.post("http://localhost:5000/api/auth/register", {name, email, password})
        console.log(data)
      }if(state == "login"){
        const {data} = await axios.post()
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">name</label>
        <input type="text" name="username" id="name" onChange={(e)=> setName(e.target.value)}/>
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email"  onChange={(e)=> setEmail(e.target.value)} />
        <label htmlFor="email">Password</label>
        <input type="password" name="password" id="password"  onChange={(e)=> setPassword(e.target.value)} />
        <button type="submit">REGISTER</button>
      </form>
    </div>
  )
}

export default Login