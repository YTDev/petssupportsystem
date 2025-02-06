import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <>
      {/* <Navbar />
      <div className="h-[1000vh] bg-yellow-300"></div> */}
      {/* <SignUp /> */}
      <Navbar />
      <div className="h-[1000vh] bg-yellow-300">
        <HeroSection />
      </div>
    </>
  );
}

export default App;
