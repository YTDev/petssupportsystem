import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavbarAlt from "../components/common/NavbarAlt";
import Footer from "../components/common/Footer";

import MapComponent from "../components/MapComponent";
import PetDetailsGrid from "../components/layout/PetDetailsGrid";
import { FaMapMarkerAlt, FaEnvelope, FaHome } from "react-icons/fa";
import AdoptionForm from "../components/forms/AdoptionForm";
const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchPetDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/animals/${id}`);

        // Format the pet data for display
        const animalData = response.data;
        const formattedPet = {
          id: animalData.animalID,
          name: animalData.animalName,
          type:
            animalData.Species?.speciesName ||
            (animalData.speciesID === 1 ? "Dog" : "Cat"),
          breed: animalData.Breed?.breedName || "Mixed",
          age: calculateAge(animalData.birthDate),
          gender: animalData.gender,
          size: animalData.size,
          description: animalData.animalDescription,
          isVaccinated: animalData.isVaccinated,
          joinDate: animalData.joinDate,
          imageUrl:
            animalData.imageUrl || "https://placehold.co/300x300?text=No+Image",
          shelter: animalData.Shelter?.shelterName || "Unknown Shelter",
          shelterAddress: animalData.Shelter?.address || "",
          longitude: animalData.Shelter?.longitude,
          latitude: animalData.Shelter?.latitude,
          shelterEmail: animalData.Shelter?.email,
          shelterPhone: animalData.Shelter?.phoneNumber,
        };

        setPet(formattedPet);
      } catch (err) {
        console.error("Error fetching pet details:", err);
        setError("Failed to load pet details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  // Calculate age from birthDate
  const calculateAge = (birthDate) => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (loading) {
    return (
      <div>
        <NavbarAlt />
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div>
        <NavbarAlt />
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error || "Pet Not Found"}
          </h1>
          <p className="mb-6">
            The pet you're looking for might have been adopted or removed.
          </p>
          <Link
            to="/animals"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavbarAlt />
      <div className="max-w-7xl px-4 mx-auto mt-6">
        <Link
          to="/animals"
          className="px-4 py-2 border border-gray-300 rounded-md mr-4 hover:bg-gray-50"
        >
          Back to Listings
        </Link>
      </div>
      <PetDetailsGrid pet={pet} />
      <div className="max-w-7xl px-4 mx-auto py-8">
        <div className="w-full md:mb-0 md:w-2/3 md:pr-12">
          <div className="flex justify-between items-center ">
            <h2 className="text-3xl font-bold mb-1">About {pet.name}</h2>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {pet.age} {pet.age === 1 ? "year" : "years"}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            At the shelter since: {new Date(pet.joinDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700">{pet.description}</p>
          <hr className="w-full  border-t border-gray-300 my-4" />
          <div className="mb-6">
            {pet.shelter && (
              <div className="  ">
                <h3 className="text-xl font-semibold mb-4 ">Contact Details</h3>
                <div className="space-y-2">
                  <p className=" flex items-center text-gray-700">
                    <FaHome className="inline-block mr-2 text-gray-500" />
                    {pet.shelter}
                  </p>

                  {pet.shelterAddress && (
                    <p className="text-gray-700 flex items-center">
                      <FaMapMarkerAlt className="inline-block mr-2 text-gray-500" />
                      {pet.shelterAddress}
                    </p>
                  )}

                  {pet.shelterEmail && (
                    <p className="text-gray-700 flex items-center">
                      <FaEnvelope className="inline-block mr-2 text-gray-500" />
                      <a
                        href={`mailto:${pet.shelterEmail}`}
                        className="hover:text-blue-500"
                      >
                        {pet.shelterEmail}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <hr className="w-full  border-t border-gray-300 my-4" />
          <div className="rounded-3xl overflow-hidden">
            <MapComponent
              latitude={pet.latitude}
              longitude={pet.longitude}
              petName={pet.name}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PetDetails;
