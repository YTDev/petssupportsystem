import React from "react";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
const PetCard = ({ pet }) => {
  return (
    <Link to={`/pets/${pet.id}`} className="group relative cursor-pointer ">
      <div className=" w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-sm sm:hover:shadow-lg border  border-white">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
      {/* fav icon */}
      <div className="bg-[#10132380] p-0.5 absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full ">
        <IoIosHeartEmpty className="text-2xl text-white" />
      </div>
      {/* pet info */}
      <div className="absolute inset-x-3 bottom-3 h-20 flex-1 overflow-hidden truncate rounded-2xl bg-white py-3 pl-6 ">
        <div className="font-display truncate text-xl font-semibold text-gray-900">
          {pet.name}
        </div>
        <div className="flex items-center gap-2 text-lg">
          <span className="text-gray-600">{pet.age} years </span>

          {/* <span className="truncate text-gray-600"> {pet.breed}</span> */}
          {pet.distance !== undefined && (
            <>
              <div className="h-4 w-0.5 bg-gray-400"></div>
              <span className="truncate text-gray-600">
                {pet.distance?.toFixed(0)} km
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
