import React, { useState, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [state, setState] = useState("register");
  const { backendUrl, login } = useContext(UserContext);
  const navigate = useNavigate();

  const initialData = {
    name: "",
    email: "",
    password: "",
  };
  const reducer = (data, action) => {
    switch (action.type) {
      case "input":
        return { ...data, [action.feild]: action.value };
      case "register":
        return register;
      default:
        return data;
    }
  };
  const [info, dispatch] = useReducer(reducer, initialData);
  const setData = (e) => {
    dispatch({ type: "input", feild: e.target.name, value: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/register",
        info,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast(data.message);
        setState("login");
      } else {
        toast(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/login",
        { email: info.email, password: info.password },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast(data.message);
        setState("login");
        navigate("/admin");
      } else {
        toast(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };
  return (
    <>
      <section>
        <div className="bg-amber-100 h-dvh flex justify-center items-center">
          <div className="bg-gray-900 w-lg  p-10">
            <h3 className="text-white font-bold text-3xl text-center">
              {state == "register" ? "Register" : "Login"}
            </h3>
            <form action="" className="flex flex-col gap-3 py-10 px-5">
              {state == "register" && (
                <input
                  className="text-white border border-white rounded-3xl p-3"
                  type="text"
                  placeholder="Full name"
                  name="name"
                  value={info.name}
                  onChange={setData}
                  required
                />
              )}

              <input
                className="text-white border border-white rounded-3xl p-3"
                type="email"
                placeholder="Email"
                name="email"
                value={info.email}
                onChange={setData}
                required
              />
              <input
                className="text-white border border-white rounded-3xl p-3"
                type="password"
                placeholder="passwod"
                name="password"
                value={info.password}
                onChange={setData}
                required
              />
              <input
                className="bg-white text-gray-900 p-3 rounded-3xl"
                type="submit"
                value={state == "register" ? "Sing up" : "Login"}
                onClick={state == "register" ? registerHandler : loginHandler}
              />
            </form>
            {state == "register" ? (
              <p className="text-white">
                I have account{" "}
                <span
                  className="text-white underline"
                  onClick={() => setState("login")}
                >
                  sing in
                </span>
              </p>
            ) : (
              <p className="text-white">
                I have account{" "}
                <span
                  className="text-white underline"
                  onClick={() => setState("register")}
                >
                  sing up
                </span>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
