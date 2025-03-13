import React, { useState } from "react";
import { PiPawPrint } from "react-icons/pi";
import { Link } from "react-router-dom";
import AnimalCardSkeleton from "./AnimalCardSkeleton";

const AnimalCard = ({ pet, isLoading = false }) => {
  if (isLoading) {
    return <AnimalCardSkeleton />;
  }

  const [isFavorite, setIsFavorite] = useState(false);

  const getStatusColor = (status) => {
    if (!status) return { bg: "bg-gray-100", text: "text-gray-800" };
    
    switch (status.toLowerCase()) {
      case "available":
        return { bg: "bg-green-100", text: "text-green-800" };
      case "foster":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "pending":
        return { bg: "bg-yellow-100", text: "text-yellow-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  const status = pet.status || "Available";
  const statusColor = getStatusColor(status);

  return (
    <Link
      to={`/animals/${pet.id}`}
      className="group relative rounded-lg shadow-sm overflow-hidden w-full h-82"
    >
      {/* Full-width image */}
      <img
        src={pet.imageUrl || "https://placehold.co/300x300?text=No+Image"}
        alt={`Photo of ${pet.name}`}
        className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-300 ease-in-out"
      />

      {/* Overlay controls at the top */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <span
          className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text}`}
        >
          {status}
        </span>
        <div className="flex absolute cursor-pointer right-3 items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="p-2 rounded-full bg-white/80 hover:bg-white focus:outline-none"
            aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
          >
            <PiPawPrint
              className={`size-6 transition-colors ${
                isFavorite ? "fill-yellow-400 text-blue-500" : "text-gray-800"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Information box overlay at the bottom */}
      <div className="absolute inset-x-4 bottom-3 h-15 flex-1 overflow-hidden rounded-2xl bg-white/80 py-1 pl-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {pet.name} ({pet.gender ? pet.gender.charAt(0) : '?'})
        </h3>
        <div className="flex items-center justify-between gap-4"></div>

        <div className="flex items-center gap-2 text-m text-gray-600 ">
          <div className="flex items-center gap-2 text-l">
            <span className="text-gray-600">
              {pet.age !== undefined && pet.age !== null 
                ? `${pet.age} ${pet.age === 1 ? 'year' : 'years'}`
                : 'Age unknown'}
            </span>

            {pet.distance && (
              <>
                <div className="h-4 w-0.5 bg-gray-400"></div>
                <span className="truncate text-gray-600">
                  {typeof pet.distance === 'number' 
                    ? `${pet.distance.toFixed(1)} km` 
                    : pet.distance}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimalCard;