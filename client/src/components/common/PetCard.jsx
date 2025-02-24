import React from "react";
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{pet.name}</h2>
        <p className="text-gray-600">
          {pet.breed} - {pet.type}
        </p>
        <p className="mt-2 text-sm text-gray-700">
          {pet.description.substring(0, 60)}...
        </p>
        <Link
          to={`/pets/${pet.id}`}
          className="inline-block mt-4 text-blue-600 underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
