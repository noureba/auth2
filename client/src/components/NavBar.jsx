import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";

function NavBar() {
  const { login, setLogin, user, backendUrl } = useContext(UserContext);

  const logoutHandler = async ()=>{
    const {data} = await axios.post(backendUrl+"/api/auth/logout",{},{withCredentials:true})
    if(data.success){
      toast(data.message)
    }
  }
  return (
    <div className="nav-bar bg-gray-900 text-white flex justify-between items-center p-4">
      <div>
        <Link to="/">
          <h1>logo</h1>
        </Link>
      </div>
      <div>
        {login ? (
          <div>
            <p>
              Hi, <span>{user.name}</span>
            </p>
            <p className="underline" onClick={logoutHandler}>Logout</p>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-white text-gray-900 hover:bg-yellow-100 py-2 px-4 rounded-4xl">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
