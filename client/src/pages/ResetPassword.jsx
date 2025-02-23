import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const { backendUrl } = useContext(UserContext);
  const naviget = useNavigate()

  const [email, setEmail] = useState("");
  const [sendEmailOtp, setSendEmailOtp] = useState(true);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewpassword] = useState("");

  const resetHandler = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-Reset-Password-Otp",
        { email },
        {
          withCredentials: true,
        }
      );
      console.log(data)
      if (data.success) {
        setSendEmailOtp(false);
        toast(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const resetPasswordHandler = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-Password",
        { email, otp, newPassword },
        {
          withCredentials: true,
        }
      );
      console.log(data)
      if (data.success) {
        setSendEmailOtp(true);
        toast(data.message);
        navigate('/login')

      }
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div>
      <h3 className="text-center font-bold text-3xl my-10">ResetPassword</h3>
      <div>
        {sendEmailOtp && (
          <div className="p-10 flex flex-col gap-5">
            <input
              className="text-black border border-black rounded-3xl p-3"
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="bg-gray-900 text-white p-3 rounded-3xl"
              onClick={resetHandler}
            >
              Reset password
            </button>
          </div>
        )}
      </div>
      <div>
        <div>
          {!sendEmailOtp && (
            <div className="p-10 flex flex-col gap-5">
              <input
                className="text-black border border-black rounded-3xl p-3"
                type="number"
                placeholder="Otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <input
                className="text-black border border-black rounded-3xl p-3"
                type="password"
                placeholder="password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewpassword(e.target.value)}
                required
              />
              <button
                className="bg-gray-900 text-white p-3 rounded-3xl"
                onClick={resetPasswordHandler}
              >
                Save new password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
