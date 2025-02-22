import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import Admin from "./pages/Admin";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <>
      <NavBar />
      <ToastContainer/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-Password" element={<ResetPassword />} />


      </Routes>
      <Footer/>
    </>
  );
}

export default App;
