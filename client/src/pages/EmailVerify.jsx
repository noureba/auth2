import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

function EmailVerify() {
  const {backendUrl}= useContext(UserContext)
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  const verifyEmailOtp = async () => {
    try {
      const { data } = await axios.post(
        backendUrl+ "/api/auth/verify-Email-Otp",
        {otp} ,
        {
          withCredentials: true,
        }
      );
      if(data.success){
        toast(data.message)
        navigate("/admin")
      }
    } catch (error) {
      toast(error.message)
    }
    
    
  };

  return (
    <div className="container flex flex-col gap-5 p-20">
      <h3 className="text-center text-3xl font-bold">EmailVerify</h3>
      <input className="p-3 border border-gray-950 rounded-2xl" placeholder="your otp" type="number" maxLength="6" onChange={(e) => setOtp(e.target.value)} value={otp} />
      <button className="bg-gray-900 text-white p-4" onClick={verifyEmailOtp}>verefiy email</button>
    </div>
  );
}

export default EmailVerify;
