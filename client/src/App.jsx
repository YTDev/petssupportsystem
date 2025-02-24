import { useState, useEffect } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import AnimalCard from "./components/AnimalCard";

function App() {

  const [animalData, setAnimalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setAnimalData({
          name: "Buddy",
          age: "2 years",
          sex: "M",
          image: "https://mymodernmet.com/wp/wp-content/uploads/2017/09/dog-portraits-alexander-khokhlov-5.jpg",
          status: "Foster",
        });
        setIsLoading(false);
      }, 2000); //1 seconds
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
