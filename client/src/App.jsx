import { useState, useEffect } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import AnimalCard from "./components/AnimalCard";

function App() {

  const [animalData, setAnimalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Simulate fetching data from an API
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setAnimalData({
          name: "Buddy",
          age: "2 years",
          size: "Medium",
          description: "Buddy is a very playful and friendly dog. He loves to play fetch and go on long walks.",
          image: "https://picsum.photos/id/237/280/180",
          status: "Available",
          homeDetails: "Apartment",
          shelterName: "Cantinho do Tareco",
        });
        setIsLoading(false);
      }, 1000); //1 seconds
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <AnimalCard 
        isLoading={isLoading}
        {...animalData}
      />
      {/* <div className="h-[1000vh] bg-gray-300"></div> */}
    </>
  );
}

export default App;
