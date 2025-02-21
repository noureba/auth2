import axios from "axios";
import React, { useEffect } from "react";

const Admin = () => {
  const getData = async () => {
    try {

      const {data} = await axios.get("http://localhost:5000/api/auth/data",{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const sendOtpHandeler = async ()=>{
    const {data} = await axios.post("http://localhost:5000/api/auth/send-Email-Otp")
    console.log(data);
  }
  return (
    <div>
      <button onClick={getData}>click</button>
      <button onClick={sendOtpHandeler}>send otp</button>
    </div>
  );
};

export default Admin;
