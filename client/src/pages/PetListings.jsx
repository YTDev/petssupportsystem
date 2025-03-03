import React, { useState, useCallback } from "react";
import PetCard from "../components/common/PetCard";
import pets from "../data/pets";
import NavbarAlt from "../components/common/NavbarAlt";
import PetFilter from "../components/common/PetFilter";

const PetListings = () => {
  const [filteredPets, setFilteredPets] = useState([]);

  const handleFilterChange = useCallback((filters) => {
    let newFiltered = pets.filter((pet) => pet.type === filters.type);

    // gender filter
    const genderFilters = filters.attributes.filter((attr) =>
      ["Male", "Female"].includes(attr)
    );
    if (genderFilters.length) {
      newFiltered = newFiltered.filter((pet) =>
        genderFilters.includes(pet.gender)
      );
    }

    // multi-sort algo: by order of click
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
  }, []);

  return (
    <div>
      <NavbarAlt />
      <PetFilter onFilterChange={handleFilterChange} />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Available Pets for Adoption</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetListings;
