import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import AdoptionForm from "../components/forms/AdoptionForm";

export const AdoptionContext = createContext();

export const AdoptionProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const { petID } = useParams(); // Pet id
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000/api"; // Update with your API URL

  // Configure axios with the base URL
  axios.defaults.baseURL = API_BASE_URL;

  // Token verification
  /*   useEffect(() => {
    if (!isAuthenticated) {
      // Ask user to log in
      if (
        window.confirm(
          "You aren't currently logged in to make an adoption. Go to login page?"
        )
      ) {
        navigate("/login");
      }
    }
  }, [isAuthenticated]); */

  // Animal details fetch
  useEffect(() => {
    const fetchPetDetails = async () => {
      setLoading(true);
      setError(null);
      console.log("HELP ME PLEASE I CANT FIGURE THIS OUT SOMEONE HEL-");
      try {
        const response = await axios.get(`${API_BASE_URL}/animals/${petID}`);
        console.log("ERROR :", response);
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
        console.log("FORMATED PET: \n", formattedPet);
        setPet(formattedPet);
      } catch (err) {
        console.error("Error fetching pet details:", err);
        setError("Failed to load pet details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [petID]);

  const registerAdoption = async (adoptionData, motive) => {
    console.log("Entered the function!");
    console.log("Adoption data: ", adoptionData);
    try {
      const endpoint =
        motive === "adoption"
          ? "/adoptions/createAdoption"
          : "/message/createMessage";

      const response = await axios.post(endpoint, adoptionData);
      console.log("Registration response:", response.data);

      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Adoption error:", error);
      throw new Error(
        error.response?.data?.message || "Request failed. Please try again."
      );
    }
  };

  return (
    <AdoptionContext.Provider
      value={{
        pet,
        registerAdoption,
      }}
    >
      {children}
    </AdoptionContext.Provider>
  );
};

export const useAdoptions = () => useContext(AdoptionContext);
