import React from "react";
import PetCard from "../components/common/PetCard";
import pets from "../data/pets";
import Navbar from "../components/common/Navbar";

const PetListings = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Available Pets for Adoption</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetListings;
