import React, { useState, useEffect, useCallback } from "react";
import AnimalCard from "../components/common/AnimalCard";
import AnimalCardSkeleton from "../components/common/AnimalCardSkeleton";
import NavbarAlt from "../components/common/NavbarAlt";
import PetFilter from "../components/common/PetFilter";

const PetListings = () => {
  const [filteredPets, setFilteredPets] = useState([]);
  const [allPets, setAllPets] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Fetch all pets from backend
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/pets");
        const data = await response.json();

        // Fake loading time of 1sec
        await new Promise(resolve => setTimeout(resolve, 1000));

        const petsWithDistanceAndAge = data.map((pet) => ({
          ...pet,
          distance: userLocation
            ? calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              pet.latitude,
              pet.longitude
            )
            : null,
          age: calculateAge(pet.dob),
        }));

        setAllPets(petsWithDistanceAndAge);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [userLocation]);

  // user location
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

  const handleFilterChange = useCallback(
    (filters) => {
      setLoading(true);

      setTimeout(() => {
        let newFiltered = allPets.filter((pet) => pet.type === filters.type);


        //gender filter
        const genderFilters = filters.attributes.filter((attr) =>
          ["Male", "Female"].includes(attr)
        );
        if (genderFilters.length) {
          newFiltered = newFiltered.filter((pet) =>
            genderFilters.includes(pet.gender)
          );
        }

        //sorting filter
        const sortingAttributes = filters.attributes.filter((attr) =>
          ["Closest", "Youngest", "New Joiners"].includes(attr)
        );

        if (sortingAttributes.length) {
          newFiltered.sort((a, b) => {
            for (const attr of sortingAttributes) {
              switch (attr) {
                case "Closest":
                  if (a.distance !== b.distance) return a.distance - b.distance;
                  break;
                case "Youngest":
                  if (a.age !== b.age) return a.age - b.age;
                  break;
                case "New Joiners":
                  const joinDateA = new Date(a.joinDate).getTime();
                  const joinDateB = new Date(b.joinDate).getTime();
                  if (joinDateA !== joinDateB) return joinDateB - joinDateA;
                  break;
                default:
                  break;
              }
            }
            return 0;
          });
        }

        setFilteredPets(newFiltered);
        setLoading(false);
      }, 1000);
    },
    [allPets]
  );

  return (
    <div>
      <NavbarAlt />
      <PetFilter onFilterChange={handleFilterChange} />
      <div className="max-w-8xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Available Pets for Adoption</h1>
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {loading ? (
            Array(filteredPets.length || allPets.length).fill().map((_, index) => (
              <AnimalCardSkeleton key={index} />
            ))
          ) : (
            filteredPets.map((pet) => (
              <AnimalCard key={pet.id} pet={pet} />
            ))
          )}
        </div>
      </div>
      {/* Button to test loading skeleton */}
      <button
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Test Loading (1s)
      </button>
    </div>
  );
}; 0

export default PetListings;
