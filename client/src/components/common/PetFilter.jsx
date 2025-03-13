import React, { useState, useEffect } from "react";
import { PiCatLight, PiDog } from "react-icons/pi";
import { RiResetLeftFill } from "react-icons/ri";

const PetFilter = ({ onFilterChange }) => {
  const [activeType, setActiveType] = useState("Dog");
  const [activeAttributes, setActiveAttributes] = useState([]);

  const typeOptions = ["Dog", "Cat"];
  const attributeOptions = [
    "New Joiners",
    "Closest",
    "Youngest",
    "Male",
    "Female",
    "Small",
    "Medium",
    "Big"
  ];

  const mapFiltersToApiParams = () => {
    const params = {};

    // Map animal type by species
    params.speciesID = activeType === "Dog" ? 1 : 2;

    //Map gender filters
    if (activeAttributes.includes("Male")) {
      params.gender = "Male";
    } else if (activeAttributes.includes("Female")) {
      params.gender = "Female";
    }

    //Map size filter
    if (activeAttributes.includes("Small")) {
      params.size = "Small";
    } else if (activeAttributes.includes("Medium")) {
      params.size = "Medium";
    } else if (activeAttributes.includes("Big")) {
      params.size = "Big";
    }

    // Map vaccination status
    if (activeAttributes.includes("Vaccinated")) {
      params.isVaccinated = true;
    }

    // Additional non-query parameters (for frontend sorting)
    const sortingPreferences = [];
    if (activeAttributes.includes("New Joiners")) sortingPreferences.push("New Joiners");
    if (activeAttributes.includes("Closest")) sortingPreferences.push("Closest");
    if (activeAttributes.includes("Youngest")) sortingPreferences.push("Youngest");

    return {
      queryParams: params,
      sortingPreferences
    };
  };

  // trigger the filter on mount
  useEffect(() => {
    if (onFilterChange) {
      const filters = mapFiltersToApiParams();
      onFilterChange(filters);
    }
  }, [activeType, activeAttributes, onFilterChange]);

  const handleTypeSelect = (type) => {
    setActiveType(type);
  };

  const handleAttributeToggle = (attr) => {
    let newAttributes = [...activeAttributes];

    if (attr === "Male" || attr === "Female") {
      const oppositeGender = attr === "Male" ? "Female" : "Male";
      newAttributes = newAttributes.filter((a) => a !== oppositeGender);

      if (newAttributes.includes(attr)) {
        newAttributes = newAttributes.filter((a) => a !== attr);
      } else {
        newAttributes.push(attr);
      }

    } else if (attr === "Small" || attr === "Medium" || attr === "Big") {
      const otherSizes = ["Small", "Medium", "Big"].filter(size => size !== attr);
      newAttributes = newAttributes.filter(a => !otherSizes.includes(a));

      if (newAttributes.includes(attr)) {
        newAttributes = newAttributes.filter((a) => a !== attr);
      } else {
        newAttributes.push(attr);
      }

    } else {
      newAttributes = newAttributes.includes(attr)
        ? newAttributes.filter((a) => a !== attr)
        : [...newAttributes, attr];
    }
    setActiveAttributes(newAttributes);
  }
  


  const handleResetFilters = () => {
    setActiveType("Dog");
    setActiveAttributes([]);
  };

  return (
    <div className="w-full shadow-sm">
      <div className="max-w-7xl mx-auto w-full py-2 md:pr-6">
        <div className="flex w-full items-center flex-wrap">
          <div className="min-w-4 shrink-0 md:min-w-6"></div>
          <button
            onClick={handleResetFilters}
            className="cursor-pointer min-w-fit rounded-full p-2.5 bg-gray-800/10 text-xl flex items-center justify-center"
          >
            <RiResetLeftFill />
          </button>
          <div className="mx-2 h-7 border-r"></div>

          {/* Animal Type Selection */}
          <div className="bg-gray-800/10 mr-2 flex rounded-full">
            {typeOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleTypeSelect(option)}
                className={`cursor-pointer flex items-center rounded-full px-4 py-2.5 font-semibold text-sm transition 
                ${activeType === option
                    ? "bg-gray-800/20 text-gray-800"
                    : "text-gray-800"
                  }`}
              >
                {option === "Dog" ? (
                  <PiDog className="text-lg" />
                ) : (
                  <PiCatLight className="text-lg" />
                )}
                <span className="ml-1">{option}</span>
              </button>
            ))}
          </div>

          {/* Attribute Filters */}
          <div className="mr-auto flex mt-2 sm:mt-0 flex-wrap">
            {attributeOptions.map((attr, index) => (
              <button
                key={index}
                onClick={() => handleAttributeToggle(attr)}
                className={`cursor-pointer relative mr-2 min-w-fit rounded-full px-4 py-2.5 text-sm font-medium transition bg-gray-800/10 
                ${activeAttributes.includes(attr) ? "bg-gray-800/20" : ""}`}
              >
                {attr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetFilter;
