import { useState, useEffect } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import AnimalCard2 from "./components/AnimalCard2";

function App() {

  const [animalData, setAnimalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  //Simulate fetching data from an API
  // useEffect(() => {
  //   const fetchData = () => {
  //     setTimeout(() => {
  //       setAnimalData({
  //         name: "Buddy",
  //         age: "2 years",
  //         size: "Medium",
  //         description: "Buddy is a very playful and friendly dog. He loves to play fetch and go on long walks.",
  //         image: "https://mymodernmet.com/wp/wp-content/uploads/2017/09/dog-portraits-alexander-khokhlov-5.jpg",
  //         status: "Available",
  //         homeDetails: "Apartment",
  //         shelterName: "Cantinho do Tareco",
  //       });
  //       setIsLoading(false);
  //     }, 5000); //1 seconds
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setAnimalData({
          name: "Buddy",
          age: "2 years",
          sex: "M",
          image: "https://mymodernmet.com/wp/wp-content/uploads/2017/09/dog-portraits-alexander-khokhlov-5.jpg",
          status: "Pending",
        });
        setIsLoading(false);
      }, 2000); //1 seconds
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      {/* <AnimalCard
        isLoading={isLoading}
        {...animalData}
      /> */}

      <AnimalCard2
        isLoading={isLoading}
        {...animalData}
      />
      {/* <div className="h-[1000vh] bg-gray-300"></div> */}
    </>
  );
}

export default App;
