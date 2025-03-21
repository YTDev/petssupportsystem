const axios = require('axios');

// Add your API keys here
const DOG_API_KEY = 'live_qGqB6q2jKeiCRMB9oLtOD9qiPiBD5griSrSce0KLZOAA0ZRXDUnD1hJqrmI9QftN';
const CAT_API_KEY = 'live_7FGZ3Eog8rpHg0jZOqIlkrR15sHmsrQtdp3jDAEPB4Q4e9Vi9Zy0P7Hn5RhOIOcf';

// Create axios instances for both APIs
const dogApiClient = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
  headers: { 'x-api-key': DOG_API_KEY }
});

const catApiClient = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: { 'x-api-key': CAT_API_KEY }
});

/**
 * Fetch dog image by breed name
 * @param {string} breedName - The name of the dog breed
 * @returns {Promise<string|null>}
 */
const fetchDogImageByBreed = async (breedName) => {
  try {
    // Try to find the breed ID first
    const breedsResponse = await dogApiClient.get('/breeds/search', {
      params: { q: breedName }
    });
    
    if (breedsResponse.data.length === 0) {
      console.log(`No dog breed found matching: ${breedName}`);
      // Fall back to searching for generic breed images
      const genericResponse = await dogApiClient.get('/images/search', {
        params: { limit: 1 }
      });
      return genericResponse.data[0]?.url || null;
    }
    
    const breedId = breedsResponse.data[0].id;
    
    // Get images for that breed
    const imagesResponse = await dogApiClient.get('/images/search', {
      params: { breed_id: breedId, limit: 1 }
    });
    
    return imagesResponse.data[0]?.url || null;
  } catch (error) {
    console.error('Error fetching dog image:', error);
    return null;
  }
};

/**
 * Fetch cat image by breed name
 * @param {string} breedName - The name of the cat breed
 * @returns {Promise<string|null>} - The URL of the image or null if not found
 */
const fetchCatImageByBreed = async (breedName) => {
  try {
    // Try to find the breed ID first
    const breedsResponse = await catApiClient.get('/breeds/search', {
      params: { q: breedName }
    });
    
    if (breedsResponse.data.length === 0) {
      console.log(`No cat breed found matching: ${breedName}`);
      // Fall back to searching for generic cat images
      const genericResponse = await catApiClient.get('/images/search', {
        params: { limit: 1 }
      });
      return genericResponse.data[0]?.url || null;
    }
    
    const breedId = breedsResponse.data[0].id;
    
    // Get images for that breed
    const imagesResponse = await catApiClient.get('/images/search', {
      params: { breed_id: breedId, limit: 1 }
    });
    
    return imagesResponse.data[0]?.url || null;
  } catch (error) {
    console.error('Error fetching cat image:', error);
    return null;
  }
};

/**
 * Get an image for an animal based on species and breed
 * @param {number} speciesId - The species ID (1 for dog, 2 for cat)
 * @param {string} breedName - The breed name
 * @returns {Promise<string|null>} - The URL of the image or null if not found
 */
const getAnimalImage = async (speciesId, breedName) => {
  if (speciesId === 1) {
    return await fetchDogImageByBreed(breedName);
  } else if (speciesId === 2) {
    return await fetchCatImageByBreed(breedName);
  } else {
    console.warn(`Unsupported species ID: ${speciesId}`);
    return null;
  }
};

module.exports = {
  fetchDogImageByBreed,
  fetchCatImageByBreed,
  getAnimalImage
};