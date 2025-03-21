// src/pages/Dashboard/Favorites.jsx
import React, { useEffect, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../hooks/useAuth';
import AnimalCard from '../../components/common/AnimalCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [animalDetails, setAnimalDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAnimalDetails = async () => {
      if (favoritesLoading) return;
      
      if (!isAuthenticated) {
        setError("Please log in to view your favorites");
        setLoading(false);
        return;
      }
      
      if (!favorites || favorites.length === 0) {
        setAnimalDetails([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log("Fetching details for favorited animals:", favorites);
        
        // Get animal IDs from favorites (handle different possible formats)
        const animalIds = favorites.map(fav => 
          fav.animalID || fav.animalId || fav.id
        ).filter(id => id); // Filter out any undefined/null values
        
        console.log("Animal IDs to fetch:", animalIds);
        
        if (animalIds.length === 0) {
          setAnimalDetails([]);
          setLoading(false);
          return;
        }
        
        // Fetch each animal individually
        const animalPromises = animalIds.map(id => 
          axios.get(`/animals/${id}`).catch(err => {
            console.warn(`Error fetching animal ${id}:`, err);
            return { data: null }; // Return null data for failed requests
          })
        );
        
        const responses = await Promise.all(animalPromises);
        const animals = responses
          .map(res => res.data)
          .filter(animal => animal); // Filter out null results
        
        console.log("Retrieved animal details:", animals);
        setAnimalDetails(animals);
      } catch (error) {
        console.error('Error fetching favorite animals:', error);
        setError("Failed to load your favorites. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimalDetails();
  }, [favorites, favoritesLoading, isAuthenticated]);
  
  // Format animal for card component
  const formatAnimalForCard = (animal) => {
    return {
      id: animal.animalID,
      name: animal.animalName,
      type: animal.Species?.speciesName || (animal.speciesID === 1 ? "Dog" : "Cat"),
      breed: animal.Breed?.breedName || "Mixed",
      description: animal.animalDescription,
      gender: animal.gender,
      age: calculateAge(animal.birthDate),
      status: animal.status || "Available",
      size: animal.size,
      imageUrl: animal.imageUrl || "https://placehold.co/300x300?text=No+Image",
      shelter: animal.Shelter?.shelterName || "Unknown Shelter"
    };
  };
  
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
  
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading your favorites...</p>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link to="/animals" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Browse Animals
        </Link>
      </div>
    );
  }
  
  // Empty state
  if (animalDetails.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
        <p className="text-gray-600 mb-6">Start browsing animals and add some to your favorites!</p>
        <Link to="/animals" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Browse Animals
        </Link>
      </div>
    );
  }
  
  // Success state with animal cards
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Animals</h1>
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {animalDetails.map(animal => (
          <AnimalCard 
            key={animal.animalID} 
            pet={formatAnimalForCard(animal)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;