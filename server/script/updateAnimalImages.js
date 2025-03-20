require('dotenv').config({path: '../.env'});
const axios = require('axios');
const { Animal, Breed, Species } = require('../models/indexModels');
const { Op } = require('sequelize');

// Add your API keys here
const DOG_API_KEY = 'live_qGqB6q2jKeiCRMB9oLtOD9qiPiBD5griSrSce0KLZOAA0ZRXDUnD1hJqrmI9QftN';
const CAT_API_KEY = 'live_7FGZ3Eog8rpHg0jZOqIlkrR15sHmsrQtdp3jDAEPB4Q4e9Vi9Zy0P7Hn5RhOIOcf';
1
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
 * Update all animals in the database with appropriate images based on their breeds
 */
const updateAnimalImages = async () => {
  try {
    // Fetch all animals that need image updates
    const animals = await Animal.findAll({
        include: [
            { model: Species },
            { model: Breed }
          ]
    });
    
    console.log(`Found ${animals.length} animals that need image updates.`);
    
    // Update each animal one by one
    let successCount = 0;
    let failCount = 0;
    
    for (const animal of animals) {
      try {
        const speciesId = animal.speciesID;
        const breedName = animal.Breed?.breedName;
        
        if (!breedName) {
          console.log(`Skipping animal ${animal.animalID} (${animal.animalName}) - No breed information`);
          failCount++;
          continue;
        }
        
        let imageUrl = null;
        
        // Fetch image based on species
        if (speciesId === 1) { // Dog
          console.log(`Fetching dog image for ${animal.animalName} (Breed: ${breedName})`);
          imageUrl = await fetchDogImageByBreed(breedName);
        } else if (speciesId === 2) { // Cat
          console.log(`Fetching cat image for ${animal.animalName} (Breed: ${breedName})`);
          imageUrl = await fetchCatImageByBreed(breedName);
        } else {
          console.log(`Unsupported species ID ${speciesId} for animal ${animal.animalID}`);
          failCount++;
          continue;
        }
        
        if (imageUrl) {
          // Update the animal record
          await animal.update({ imageUrl });
          console.log(`Updated image for ${animal.animalName} (ID: ${animal.animalID})`);
          successCount++;
          
          // Add a small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          console.log(`Failed to find image for ${animal.animalName} (ID: ${animal.animalID})`);
          failCount++;
        }
      } catch (error) {
        console.error(`Error updating animal ${animal.animalID}:`, error);
        failCount++;
      }
    }
    
    console.log(`Update complete. Success: ${successCount}, Failed: ${failCount}`);
  } catch (error) {
    console.error('Error updating animal images:', error);
  }
};

// Run the update script
updateAnimalImages()
  .then(() => {
    console.log('Animal image update process completed.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Script encountered an error:', error);
    process.exit(1);
  });