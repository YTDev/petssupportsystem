import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, getUserId } = useContext(AuthContext);
  
  // Fetch user's favorites when authenticated
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      
      // Get user ID from auth context
      const userId = getUserId();
      
      if (!userId) {
        console.warn("No user ID available to fetch favorites");
        setFavorites([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Try different endpoint variations to find the right one
        try {
          console.log(`Attempting to fetch favorites from /users/${userId}/favorites`);
          const response = await axios.get(`/users/${userId}/favorites`);
          console.log("Favorites response:", response.data);
          setFavorites(response.data);
        } catch (error) {
          if (error.response?.status === 404) {
            // Try alternative endpoint if first one fails
            console.log("First endpoint not found, trying alternative");
            try {
              const response = await axios.get(`/favorites/${userId}`);
              console.log("Favorites from alternative endpoint:", response.data);
              setFavorites(response.data);
            } catch (altError) {
              console.error("Error fetching favorites from alternative endpoint:", altError);
              setFavorites([]);
            }
          } else {
            throw error;
          }
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, [user, isAuthenticated, getUserId]);
  
  // Check if an animal is in favorites
  const isFavorite = (animalId) => {
    if (!favorites || favorites.length === 0) return false;
    
    // Handle different possible response structures
    if (Array.isArray(favorites)) {
      return favorites.some(fav => 
        fav.animalID === animalId || fav.id === animalId || fav.animalId === animalId
      );
    }
    return false;
  };
  
  // Add an animal to favorites
  const addToFavorite = async (animalId) => {
    if (!isAuthenticated) {
      return { success: false, message: 'Please log in to add favorites' };
    }
    
    const userId = getUserId();
    if (!userId) {
      return { success: false, message: 'User ID not available' };
    }
    
    try {
      console.log(`Attempting to add animal ${animalId} to favorites for user ${userId}`);
      
      // Try different endpoint patterns
      try {
        await axios.post('/users/favorites', {
          userID: userId,
          animalID: animalId
        });
      } catch (error) {
        if (error.response?.status === 404) {
          console.log("First endpoint not found, trying alternative");
          // Try alternative endpoint
          await axios.post('/favorites', {
            userId: userId,
            animalId: animalId
          });
        } else {
          throw error;
        }
      }
      
      // Update local state - optimistic update
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
    
    const userId = getUserId();
    if (!userId) {
      return { success: false, message: 'User ID not available' };
    }
    
    try {
      console.log(`Attempting to remove animal ${animalId} from favorites for user ${userId}`);
      
      // Try different endpoint patterns
      try {
        await axios.delete(`/users/favorites/${userId}/${animalId}`);
      } catch (error) {
        if (error.response?.status === 404) {
          console.log("First endpoint not found, trying alternative");
          // Try alternative endpoint
          await axios.delete(`/favorites/${userId}/${animalId}`);
        } else {
          throw error;
        }
      }
      
      // Update local state
      setFavorites(prev => prev.filter(fav => 
        fav.animalID !== animalId && fav.id !== animalId && fav.animalId !== animalId
      ));
      
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