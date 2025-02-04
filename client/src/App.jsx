import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      {/* <Navbar />
      <div className="h-[1000vh] bg-yellow-300"></div> */}
      <SignUp />
    </>
  );
}

export default App;
