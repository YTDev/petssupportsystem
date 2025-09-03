import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavbarAlt from "../components/common/NavbarAlt";
import Footer from "../components/common/Footer";
import AdoptionForm from "../components/forms/AdoptionForm";

import { useAdoptions } from "../context/AdoptionContext";
const AdoptionRequest = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const { userAdoptions } = useAdoptions();
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  useEffect(() => {
    async function check() {
      try {
        const list = await userAdoptions();
        setAlreadyRequested(list.some((r) => r.animalID === Number(id)));
      } catch (e) {
        console.error(e);
      }
    }
    check();
  }, [id]);
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
        console.log("PET HEEEEREEEEE: ", formattedPet);
      } catch (err) {
        console.error("Error fetching pet details:", err);
        setError("Failed to load pet details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

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
  if (alreadyRequested) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">
          You’ve already sent a request for this pet!
        </h2>
        <p>
          <Link
            to="/animals"
            className="px-4 py-2 border border-gray-300 rounded-md mr-4 hover:bg-gray-50"
          >
            Back to Listings
          </Link>
        </p>
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
      {pet ? <AdoptionForm pet={pet} /> : <div>Loading...</div>}
      <Footer />
    </div>
  );
};

export default AdoptionRequest;
