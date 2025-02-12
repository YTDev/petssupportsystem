import React, { useState } from "react";
import {
  CalendarIcon,
  HomeIcon,
  BookmarkIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { ShareIcon } from "@heroicons/react/24/solid";
import Ruler from "./Ruler";
import AnimalCardSkeleton from "./AnimalCardSkeleton";

const AnimalCard = ({
  name,
  age,
  size,
  description,
  image,
  status = "Available",
  homeDetails,
  shelterName,
  isLoading = false
}) => {

  if (isLoading) {
    return <AnimalCardSkeleton />;
  }

  const [isBookmark, setIsBookmark] = useState(false);

  return (
    <div className="w-72 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {status}
            </span>
            <button
              onClick={() => setIsBookmark(!isBookmark)}
              className="focus:outline-none"
            >
              <BookmarkIcon
                className={`size-6 transition-colors ${
                  isBookmark ? "fill-yellow-400 text-blue-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <img
            src={image || "/api/placeholder/280/180"}
            alt={`Photo of ${name}`}
            className="w-full h-48 object-cover rounded-md"
          />
          <button
            className="absolute bottom-0 text-white cursor-pointer bg-neutral-900/60 p-2 rounded-[50%] hover:bg-neutral-900/80"
            onClick={() => {
              alert("Clicado");
            }}
          >
            <ShareIcon className="size-5" />
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex gap-10"> 
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarIcon className="size-5" />
              <span>{age}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Ruler />
              <span>{size}</span>
            </div>
          </div>
          {homeDetails && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <HomeIcon className="size-5" />
              <span>{homeDetails}</span>
            </div>
          )}

          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-2 items-center">
          <MapPinIcon className="size-5 text-gray-600" />
          <span className="flex-1 py-2 text-xs font-medium text-gray-600">
            {shelterName || "Shelter Name"}
          </span>
          <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#207CC8] border border-transparent rounded-md hover:bg-blue-700 focus:outline-none">
            Adopt Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
