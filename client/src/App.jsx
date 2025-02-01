import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="h-[1000vh] bg-gray-300"></div>
    </>
  );
}

export default App;
