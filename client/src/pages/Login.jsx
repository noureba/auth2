import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import {useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;

function Login() {
  const { getData } = useContext(UserContext);

  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state == "register") {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/register",
          { name, email, password }
        );
        if(data.seccess){
          getData();
          navigate("/login");
        }
      }
      if (state == "login") {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );
        if(data.success){
          navigate("/admin");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        {state == "register" && (
          <div>
            <label htmlFor="username">name</label>
            <input
              type="text"
              name="username"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
}

export default Login;
