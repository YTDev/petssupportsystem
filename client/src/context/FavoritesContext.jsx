// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useContext(AuthContext);
  
  // Fetch user's favorites when authenticated
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !user) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/${user.id}/favorites`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, [user, isAuthenticated]);
  
  // Check if an animal is in favorites
  const isFavorite = (animalId) => {
    return favorites.some(fav => fav.animalID === animalId);
  };
  
  // Add an animal to favorites
  const addToFavorite = async (animalId) => {
    if (!isAuthenticated) {
      return { success: false, message: 'Please log in to add favorites' };
    }
    
    try {
      await axios.post('/api/users/favorites', {
        userID: user.id,
        animalID: animalId
      });
      
      // Update local state
      const newFavorite = { animalID: animalId };
      setFavorites(prev => [...prev, newFavorite]);
      return { success: true };
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add to favorites' 
      };
    }
  };
  
  // Remove an animal from favorites
  const removeFromFavorite = async (animalId) => {
    if (!isAuthenticated) {
      return { success: false, message: 'Please log in to manage favorites' };
    }
    
    try {
      await axios.delete(`/api/users/favorites/${user.id}/${animalId}`);
      
      // Update local state
      setFavorites(prev => prev.filter(fav => fav.animalID !== animalId));
      return { success: true };
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to remove from favorites' 
      };
    }
  };
  
  // Toggle favorite status
  const toggleFavorite = async (animalId) => {
    if (isFavorite(animalId)) {
      return await removeFromFavorite(animalId);
    } else {
      return await addToFavorite(animalId);
    }
  };
  
  return (
    <FavoritesContext.Provider value={{
      favorites,
      loading,
      isFavorite,
      addToFavorite,
      removeFromFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);