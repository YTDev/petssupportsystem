import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import AnimalCard from "./components/AnimalCard";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <AnimalCard 
      name="Buddy"
      age="2 years"
      description="Buddy is a very playful and friendly dog. He loves to play fetch and go on long walks."
      image="https://picsum.photos/id/237/280/180"
      status="Available"
      homeDetails="Apartment"
      shelterName="Cantinho do Tareco"
      />
      {/* <div className="h-[1000vh] bg-gray-300"></div> */}
    </>
  );
}

export default App;
