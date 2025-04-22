import React from "react";
import { GiPawPrint } from "react-icons/gi";
import { IoIosResize } from "react-icons/io";

import { TbVaccine } from "react-icons/tb";
import { IoIosMale, IoIosFemale } from "react-icons/io";
import { PiDogThin, PiCatThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

function PetDetailsGrid({ pet }) {
  return (
    <div className="max-w-7xl mx-auto my-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105">
          <img
            src={pet.imageUrl}
            alt={`Image of ${pet.name}`}
            className="h-[51vh] w-full object-cover"
          />
        </div>

        {/* Details Card Section */}
        <div className="bg-white border border-blue-200  rounded-lg flex flex-col justify-start gap-6">
          <h2 className="text-3xl  text-blue-950 bg-blue-50 p-8 text-center">
            {`A Closer Look at ${pet.name}!`}
          </h2>
          <div className="p-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 items-center">
              <div className="flex items-center gap-2">
                <div className="bg-blue-200 rounded-full p-3">
                  <GiPawPrint className="text-blue-950" size={20} />
                </div>
                <span className="text-gray-700 text-sm">{pet.breed}</span>
              </div>
              <div className="flex items-center gap-2 ">
                <div className="bg-blue-200 rounded-full p-3">
                  {pet.gender.toLowerCase() === "male" ? (
                    <IoIosMale className="text-blue-950" size={20} />
                  ) : (
                    <IoIosFemale className="text-blue-950" size={20} />
                  )}
                </div>
                <span className="text-blue-950 text-sm">{pet.gender}</span>
              </div>
            </div>
            <hr className="w-[90%] mx-auto border-t border-gray-100" />

            <div className="grid grid-cols-2 items-start">
              <div className="flex items-center gap-2">
                <div className="bg-blue-200 rounded-full p-3">
                  {pet.type.toLowerCase() === "dog" ? (
                    <PiDogThin className="text-blue-950" size={20} />
                  ) : pet.type.toLowerCase() === "cat" ? (
                    <PiCatThin className="text-blue-950" size={20} />
                  ) : (
                    <GiPawPrint className="text-blue-950" size={20} />
                  )}
                </div>
                <span className="text-gray-700 text-sm">{pet.type}</span>
              </div>
              <div className="flex items-center gap-2 ">
                <div className="bg-blue-200 rounded-full p-3">
                  <TbVaccine className="text-blue-950" size={20} />
                </div>
                <span className="text-blue-950 text-sm">
                  {pet.isVaccinated ? "Vaccinated" : "Not Vaccinated"}
                </span>
              </div>
            </div>
            <hr className="w-[90%] mx-auto border-t border-gray-100" />

            <div className="grid grid-cols-2 items-center">
              <div className="flex items-center gap-2">
                <div className="bg-blue-200 rounded-full p-3">
                  <IoIosResize className="text-blue-950" size={20} />
                </div>
                <span className="text-blue-950 text-sm">{pet.size} size</span>
              </div>
            </div>
          </div>

          <Link
            to={`/adoption/${pet.id}`}
            className="mx-6 cursor-pointer mb-6 px-6 py-4 bg-amber-500 text-blue-950 rounded-md font-medium text-xl flex justify-center text-center"
          >
            Request Info
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PetDetailsGrid;
