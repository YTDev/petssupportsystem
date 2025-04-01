import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AnimalCard from "../components/common/AnimalCard";
import AnimalCardSkeleton from "../components/common/AnimalCardSkeleton";
import NavbarAlt from "../components/common/NavbarAlt";
import PetFilter from "../components/common/PetFilter";
import PaginationControl from "../components/common/PaginationControl";

const PetListings = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [animalsPerPage] = useState(16);

  const API_BASE_URL = "http://localhost:8000/api"; // Update with your API URL

  // Calculate distance using the logic of Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;

    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const EARTH_RADIUS = 6371; // Earth's radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c; // Distance in km
  };

  // Calculate age from birthDate
  const calculateAge = (birthDate) => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Fetch all animals initially
  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching animals from:", `${API_BASE_URL}/animals`);
        const response = await axios.get(`${API_BASE_URL}/animals`);
        console.log("API Response:", response.data);

        // Check if response data is an array
        if (!Array.isArray(response.data)) {
          console.error("API response is not an array:", response.data);
          setError("Unexpected API response format");
          setLoading(false);
          return;
        }

        // Process the animals to add calculated fields
        const processedAnimals = response.data.map((animal) => {
          const shelterLat = animal.Shelter?.latitude;
          const shelterLon = animal.Shelter?.longitude;

          return {
            ...animal,
            distance:
              userLocation && shelterLat && shelterLon
                ? calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  shelterLat,
                  shelterLon
                )
                : null,
            age: calculateAge(animal.birthDate),
          };
        });

        setAnimals(processedAnimals);
        setFilteredAnimals(processedAnimals);
      } catch (err) {
        setError("Failed to fetch animals. Please try again later.");
        console.error("Error fetching animals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [userLocation]);

  // Handle filter changes
  const handleFilterChange = useCallback(
    async (filters) => {
      setLoading(true);

      try {
        // Extract query parameters and sorting preferences
        const { queryParams, sortingPreferences } = filters;

        // Make API call with filters
        const response = await axios.get(`${API_BASE_URL}/animals/filter`, {
          params: queryParams,
        });

        // Process animals with distance and age
        let filteredResults = response.data.map((animal) => {
          const shelterLat = animal.Shelter?.latitude;
          const shelterLon = animal.Shelter?.longitude;

          return {
            ...animal,
            distance:
              userLocation && shelterLat && shelterLon
                ? calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  shelterLat,
                  shelterLon
                )
                : null,
            age: calculateAge(animal.birthDate),
          };
        });

        // Apply client-side sorting based on sorting preferences
        if (sortingPreferences.length > 0) {
          filteredResults.sort((a, b) => {
            for (const pref of sortingPreferences) {
              if (
                pref === "Closest" &&
                a.distance !== null &&
                b.distance !== null
              ) {
                if (a.distance !== b.distance) return a.distance - b.distance;
              } else if (
                pref === "Youngest" &&
                a.age !== null &&
                b.age !== null
              ) {
                if (a.age !== b.age) return a.age - b.age;
              } else if (pref === "New Joiners") {
                const dateA = new Date(a.joinDate || 0).getTime();
                const dateB = new Date(b.joinDate || 0).getTime();
                if (dateA !== dateB) return dateB - dateA; // Newest first
              }
            }
            return 0;
          });
        }

        setFilteredAnimals(filteredResults);
        setCurrentPage(1); // Reset to first page after filter change
      } catch (err) {
        setError("Failed to apply filters. Please try again later.");
        console.error("Error applying filters:", err);
      } finally {
        setLoading(false);
      }
    },
    [userLocation, API_BASE_URL]
  );

  // Format animal data for AnimalCard component
  const formatAnimalForCard = (animal) => {
    return {
      id: animal.animalID,
      name: animal.animalName,
      type:
        animal.Species?.speciesName || (animal.speciesID === 1 ? "Dog" : "Cat"),
      breed: animal.Breed?.breedName || "Mixed",
      description: animal.animalDescription,
      gender: animal.gender,
      age: animal.age || 0,
      distance: animal.distance,
      size: animal.size,
      imageUrl: animal.imageUrl || "https://placehold.co/300x300?text=No+Image",
      shelter: animal.Shelter?.shelterName || "Unknown Shelter",
      shelterAddress: animal.Shelter?.address || "",
      isVaccinated: animal.isVaccinated,
    };
  };

  // Pagination logic
  const indexOfLastAnimal = currentPage * animalsPerPage;
  const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage;
  const currentAnimals = filteredAnimals.slice(
    indexOfFirstAnimal,
    indexOfLastAnimal
  );
  const totalPages = Math.ceil(filteredAnimals.length / animalsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <NavbarAlt />
      <PetFilter onFilterChange={handleFilterChange} />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Available Pets for Adoption</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {Array(16)
              .fill()
              .map((_, index) => (
                <AnimalCardSkeleton key={index} />
              ))}
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-2">No pets found</h2>
            <p className="text-gray-600">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              {filteredAnimals.map((animal) => (
                <AnimalCard
                  key={animal.animalID}
                  pet={formatAnimalForCard(animal)}
                />
              ))}
            </div>

            {/* Use the separate Pagination component */}
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              totalItems={filteredAnimals.length}
              itemsPerPage={animalsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PetListings;
