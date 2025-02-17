import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <NavBar />
      <ToastContainer/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
