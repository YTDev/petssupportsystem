import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import HeroSection from "./components/HeroSection";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      {/* <Navbar />
      <div className="h-[1000vh] bg-yellow-300"></div> */}
      {/* <SignUp /> */}
      {/* <div className=" bg-[#207CC8] bg-gradient-to-b from-[#103D62] from-0% to-[#207CC8] to-90% shadow text-[#f9e5bd]">
        <Navbar />
        <HeroSection />
      </div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
