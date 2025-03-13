import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAlt from "../components/common/NavbarAlt";
import DesktopGrid from "../components/layout/DesktopGrid";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = "http://localhost:8000/api"; // Update with your API URL

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
          type: animalData.Species?.speciesName || (animalData.speciesID === 1 ? "Dog" : "Cat"),
          breed: animalData.Breed?.breedName || "Mixed",
          age: calculateAge(animalData.birthDate),
          gender: animalData.gender,
          size: animalData.size,
          description: animalData.animalDescription,
          isVaccinated: animalData.isVaccinated,
          joinDate: animalData.joinDate,
          imageUrl: animalData.imageUrl || "https://placehold.co/300x300?text=No+Image",
          shelter: animalData.Shelter?.shelterName || "Unknown Shelter",
          shelterAddress: animalData.Shelter?.address || "",
          longitude: animalData.longitude,
          latitude: animalData.latitude
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
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };
  
  // Generate multiple images for the grid if only one is available
  const getImageArray = (imageUrl) => {
    // If no image, use placeholders
    if (!imageUrl || imageUrl.includes('placehold.co')) {
      return Array(5).fill("https://placehold.co/600x400?text=No+Image");
    }
    
    // Otherwise use the real image multiple times
    return Array(5).fill(imageUrl);
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
          <p className="mb-6">The pet you're looking for might have been adopted or removed.</p>
          <Link to="/animals" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavbarAlt />
      <DesktopGrid images={getImageArray(pet.imageUrl)} />
      <div className="max-w-7xl relative mx-auto flex w-full flex-col px-6 md:flex-row py-8">
        <div className="mb-4 w-full md:mb-0 md:w-2/3 md:pr-12">
          <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              {pet.breed} • {pet.type} • {pet.gender} • {pet.age} {pet.age === 1 ? 'year' : 'years'} old
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{pet.size} size</span>
              {pet.isVaccinated && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Vaccinated</span>
              )}
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">About {pet.name}</h3>
              <p className="text-gray-700">{pet.description}</p>
            </div>
            
            {pet.shelter && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Shelter Information</h3>
                <p className="font-medium">{pet.shelter}</p>
                {pet.shelterAddress && <p className="text-gray-600">{pet.shelterAddress}</p>}
              </div>
            )}
            
            <div className="mt-6">
              <Link
                to="/animals"
                className="px-4 py-2 border border-gray-300 rounded-md mr-4 hover:bg-gray-50"
              >
                Back to Listings
              </Link>
              <button 
                onClick={() => alert("Contact feature not implemented yet")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Contact Shelter
              </button>
            </div>
          </div>
        </div>
        
        {/* Right sidebar/column */}
        <div className="w-full md:w-1/3 md:sticky md:top-24 md:self-start">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Adoption Information</h3>
            <p className="mb-4">
              Interested in adopting {pet.name}? Contact the shelter to schedule a visit or learn more about the adoption process.
            </p>
            <p className="text-sm text-gray-500 mb-2">
              At the shelter since: {new Date(pet.joinDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => alert("Adoption application feature not implemented yet")}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Apply to Adopt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;