import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AdoptionContext = createContext();

export const adoptionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pet, setPet] = useState(null);
  const { petID } = useParams(); // Pet id
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8000/api"; // Update with your API URL

  // Configure axios with the base URL
  axios.defaults.baseURL = API_URL;

  // Token verification
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          console.log("Verifying token:", token);

          try {
            const response = await axios.get("/users/me");
            console.log("User data from /me endpoint:", response.data);
            setUser(response.data);
          } catch (meError) {
            console.log(
              "Couldn't use /me endpoint, trying email lookup:",
              meError.message
            );

            const email = localStorage.getItem("userEmail");
            if (email) {
              const response = await axios.get(`/users/email/${email}`);
              console.log("User data from email lookup:", response.data);

              // Save full user data
              if (response.data) {
                setUser(response.data);
              } else {
                throw new Error("User data not found");
              }
            } else {
              throw new Error("No user email found in storage");
            }
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  // Animal details fetch
  useEffect(() => {
    const fetchAdoptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/animals/${petID}`);

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
  }, [petID]);





  
};
