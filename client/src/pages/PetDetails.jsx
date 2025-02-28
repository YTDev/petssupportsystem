import React from "react";
import { useParams, Link } from "react-router-dom";
import pets from "../data/pets";

const PetDetails = () => {
  const { id } = useParams();
  const petId = parseInt(id, 10);
  const pet = pets.find((p) => p.id === petId);

  if (!pet) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Pet Not Found</h1>
        <Link to="/pets" className="text-blue-600 underline">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded overflow-hidden">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
          <p className="text-gray-600 mb-4">
            {pet.breed} - {pet.type} | Age: {pet.age}
          </p>
          <p className="text-gray-700">{pet.description}</p>
          <Link
            to="/pets"
            className="mt-4 inline-block text-blue-600 underline"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
