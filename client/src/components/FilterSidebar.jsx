import React, { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Cat, Dog } from 'lucide-react';

const FilterSidebar = ({onFilter}) => {
  const [filters, setFilters] = useState({
    speciesID: null,
    breedID: null,
    gender: null,
    size: null,
    status: null,
    isVaccinated: null,
    ageMin: null,
    ageMax: null,
  });

  const [filteredAnimals, setFilteredAnimals] = useState([]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = {...filters, [filterType]: value};
    setFilters(newFilters);
  };

  const applyFilters = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`filterAnimals?${queryParams}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFilteredAnimals(data);
    } catch (error) {
      console.error("Error fetching filtered animals:", error);
    }
  };


  return (
    <div className="sticky top-[71px] z-40 w-full bg-white md:top-[79px] transform-gpu">
      <div className="w-full shadow-sm">
        <div className="mx-auto w-full py-2 md:pr-6 max-w-8xl">
          <div className="flex w-full items-center overflow-x-auto scrollbar-hide">
            <div className="shrink-0 md:w-6" />
            <button 
              className="relative min-w-fit rounded-full py-1.5 text-sm h-10 px-1.5 bg-gray-800/10 hover:bg-gray-800/20"
              onClick={applyFilters}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-7" />
            </button>
            <div className="mx-2 h-7 border-r border-gray-200" />
            <div>
              <div className="flex h-10 rounded-full mr-2 bg-gray-800/10" role="tablist" aria-orientation="horizontal">
                <button 
                  className="flex items-center rounded-full px-3.5 py-1.5 bg-gray-800/20 font-semibold"
                  role="tab"
                  aria-selected="true"
                  tabIndex={0}
                  onClick={() => handleFilterChange("speciesID", 1)} // Assuming 1 is the ID for dogs
                >
                  <Dog className="h-5 w-5" />
                  <span className="ml-1 text-sm font-medium">Dogs</span>
                </button>
                <button 
                  className="flex items-center rounded-full px-3.5 py-1.5"
                  role="tab"
                  aria-selected="false"
                  tabIndex={-1}
                  onClick={() => handleFilterChange("speciesID", 2)} // Assuming 2 is the ID for cats
                >
                  <Cat className="h-5 w-5" />
                  <span className="ml-1 text-sm font-medium">Cats</span>
                </button>
              </div>
            </div>
            <div className="mr-auto flex h-10 w-full">
              {[
                { label: "New Joiners", filterType: "status", value: "new" },
                { label: "Youngest", filterType: "ageMin", value: 1 },
                { label: "Male", filterType: "gender", value: "male" },
                { label: "Female", filterType: "gender", value: "female" },
              ].map(({ label, filterType, value }) => (
                <button
                  key={label}
                  className="relative mr-2 min-w-fit rounded-full px-3.5 py-1.5 text-sm font-medium bg-gray-800/10 hover:bg-gray-800/20"
                  onClick={() => handleFilterChange(filterType, value)}
                >
                  {label}
                </button>
              ))}
              <div className="w-2 shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Display filtered results */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Filtered Animals</h2>
        <ul>
          {filteredAnimals.map((animal) => (
            <li key={animal.id} className="mt-2 p-2 border rounded">
              <p><strong>Name:</strong> {animal.animalName}</p>
              <p><strong>Species:</strong> {animal.speciesID}</p>
              <p><strong>Gender:</strong> {animal.gender}</p>
              <p><strong>Status:</strong> {animal.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;