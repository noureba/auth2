import axios from "axios";
import React, { useState } from "react";

function EmailVerify() {
  const [otp, setOtp] = useState();

  const verifyEmailOtp = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/verify-Email-Otp",
      { otp },
      {
        withCredentials: true,
      }
    );
    console.log(data);
  };

  return (
    <div>
      EmailVerify
      <form action="" onSubmit={verifyEmailOtp}>
        <input
          type="text"
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
        />
        <button >verefiy email</button>
      </form>
    </div>
  );
}

export default EmailVerify;
