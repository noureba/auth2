import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Admin = () => {
  const { user, login, backendUrl } = useContext(UserContext);
  const navigete = useNavigate();

  const VerifyemailHandler = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-Email-Otp",
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast(data.message);
        navigete("/email-verify");
      }
    } catch (error) {
      toast(error.message);
    }
  };
  return (
    <>
      <section className="container ">
        {login ? (
          <div className="bg-gray-900 p-20 w-dvh text-center">
            <p className="text-white text-2xl font-bold">
              hello{" "}
              <span className="text-2xl text-amber-100 font-bold">
                {user.name}
              </span>
            </p>
            <p className="text-white text-2xl font-bold">
              email:{" "}
              <span className="text-2xl text-amber-100 font-bold">
                {user.email}
              </span>
            </p>
            {!user.isAcountVerified ? (
              <button
                className="bg-white text-gray-900 p-5"
                onClick={VerifyemailHandler}
              >
                Verify email
              </button>
            ) : (
              <p className="text-white text-2xl">your email is is Verified</p>
            )}
          </div>
        ) : (
          <h3 className="text-5">please login</h3>
        )}
      </section>
    </>
  );
};

export default Admin;
