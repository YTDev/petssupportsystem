import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Pagination } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "./ImageCardSwiper.module.css";

function ImageCardSwiper() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000/api";

  // Fetch animals from the API
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        // Get all animals from the API
        const response = await axios.get(`${API_BASE_URL}/animals`);

        if (Array.isArray(response.data) && response.data.length > 0) {
          // Filter to only include animals with valid images
          const animalsWithImages = response.data.filter(animal =>
            animal.imageUrl && animal.imageUrl.trim() !== "" &&
            !animal.imageUrl.includes("No+Image")
          );

          // Randomly select 10 animals (or fewer if not enough available)
          const randomizedAnimals = getRandomAnimals(animalsWithImages, 10);

          // Format the data for the swiper
          const formattedAnimals = randomizedAnimals.map(animal => ({
            id: animal.animalID,
            src: animal.imageUrl || "https://placehold.co/400x600?text=No+Image",
            alt: `${animal.animalName}`,
            breed: animal.Breed?.breedName || "Mixed Breed",
            homeDetails: animal.size || "Pet",
            name: animal.animalName
          }));

          setAnimals(formattedAnimals);
        } else {
          throw new Error("No animals data received");
        }
      } catch (err) {
        console.error("Error fetching animals for swiper:", err);
        setError(err.message);

        // Fallback to empty array if there's an error
        setAnimals([]);
      } finally {
        setLoading(false);
      }
    };

    // Helper function to get random animals
    const getRandomAnimals = (animalArray, count) => {
      // If we have fewer animals than requested, return all of them
      if (animalArray.length <= count) return animalArray;

      // Create a copy of the array to avoid modifying the original
      const animals = [...animalArray];
      const result = [];

      // Select 'count' random animals
      for (let i = 0; i < count; i++) {
        // Get a random index
        const randomIndex = Math.floor(Math.random() * animals.length);
        // Add the random animal to the result
        result.push(animals[randomIndex]);
        // Remove the selected animal to avoid duplicates
        animals.splice(randomIndex, 1);
      }

      return result;
    };

    fetchAnimals();
  }, []);

  // If loading, show a loading state
  if (loading) {
    return (
      <div className="sm:mr-20">
        <div className="w-[300px] h-[500px] sm:w-[400px] sm:h-[600px] bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  // If error or no animals, show a fallback
  if (error || animals.length === 0) {
    return (
      <div className="sm:mr-20">
        <div className="w-[300px] h-[500px] sm:w-[400px] sm:h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No pets available to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:mr-20">
      <div className="w-[300px] h-[500px] sm:w-[400px] sm:h-[600px]">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          effect="cards"
          grabCursor={true}
          modules={[Autoplay, EffectCards, Pagination]}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {animals.map((animal) => (
            <SwiperSlide key={animal.id} className="relative w-full h-full">
              <img
                src={animal.src}
                alt={animal.alt}
                className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/400x600?text=No+Image";
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent h-40"></div>
              <div className="p-4 relative z-10 top-[80%] w-full bg-transparent text-[#103D62] text-xs md:text-sm">
                <span className="bg-white px-4 py-1.5 rounded-3xl inline-block mb-2">
                  {animal.name}
                </span>
                <div>
                  <span className="bg-white px-4 py-1.5 rounded-3xl">
                    {animal.breed}
                  </span>
                  <span className="bg-white px-4 py-1.5 rounded-3xl ml-2">
                    {animal.homeDetails}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ImageCardSwiper;