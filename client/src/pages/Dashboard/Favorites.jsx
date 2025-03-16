// src/pages/Dashboard/Favorites.jsx
import React, { useEffect, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import AnimalCard from '../../components/common/AnimalCard';
import axios from 'axios';

const Favorites = () => {
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [animalDetails, setAnimalDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnimalDetails = async () => {
      if (favoritesLoading) return;
      
      if (favorites.length === 0) {
        setAnimalDetails([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Fetch details for each favorited animal
        const animalIds = favorites.map(fav => fav.animalID);
        
        // Option 1: Fetch each animal individually
        const animalPromises = animalIds.map(id => 
          axios.get(`/api/animals/${id}`)
        );
        const responses = await Promise.all(animalPromises);
        const animals = responses.map(res => res.data);
        
        // Option 2: If you have a backend endpoint to fetch multiple animals by IDs
        // const response = await axios.post('/api/animals/batch', { ids: animalIds });
        // const animals = response.data;
        
        setAnimalDetails(animals);
      } catch (error) {
        console.error('Error fetching favorite animals:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimalDetails();
  }, [favorites, favoritesLoading]);
  
  // Format animal for card component
  const formatAnimalForCard = (animal) => {
    // Same formatting logic as in PetListings
    return {
      id: animal.animalID,
      name: animal.animalName,
      // Other properties...
    };
  };
  
  if (loading) {
    return <div>Loading your favorites...</div>;
  }
  
  if (animalDetails.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
        <p className="text-gray-600 mb-6">Start browsing animals and add some to your favorites!</p>
        <a href="/animals" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Browse Animals
        </a>
      </div>
    );
  }
  
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