import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AdoptionContext = createContext();

export const AdoptionProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [adoptions, setAdoptions] = useState([]);
  const { id } = useParams(); // Pet id
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  // Configure axios with the base URL
  axios.defaults.baseURL = API_BASE_URL;

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

  const userAdoptions = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Trying connection...");
      const response = await axios.get(
        `${API_BASE_URL}/adoptions/userAdoptions/${user.userID}`
      );
      // Assume response.data is an array of adoption objects
      const adoptionsData = response.data;

      // Optionally, format each adoption object if needed
      const formattedAdoptions = adoptionsData.map((adopt) => ({
        userID: adopt.userID,
        animalID: adopt.animalID,
        shelterID: adopt.shelterID,
        userName: adopt.userName,
        animalName: adopt.animalName,
        shelterName: adopt.shelterName,
        email: adopt.email,
        address: adopt.address,
        message: adopt.message,
      }));

      setAdoptions(formattedAdoptions);
      console.log("Formated adoptions", formattedAdoptions);
      return formattedAdoptions;
    } catch (err) {
      console.error("Error fetching adoption requests:", err);
      setError("Failed to load adoption requests. Please try again later.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const cancelAdoption = async (userID, animalID) => {
    try {
      const response = await axios.delete(
        `/adoptions/removeAdoption/${userID}/${animalID}`
      );
      window.location.reload();
      return response;
    } catch (error) {
      throw new Error("There was an error removing your request", error);
    }
  };

  return (
    <AdoptionContext.Provider
      value={{
        adoptions,
        pet,
        registerAdoption,
        userAdoptions,
        cancelAdoption,
      }}
    >
      {children}
    </AdoptionContext.Provider>
  );
};

export const useAdoptions = () => useContext(AdoptionContext);
