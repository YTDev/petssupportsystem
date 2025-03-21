const { Animal, Species, Breed, Shelter } = require('../models/indexModels');
const { Op } = require('sequelize');
const { getAnimalImage } = require('../services/animalImageService');

//All animals
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.findAll({
            include: [
                { model: Species },
                { model: Breed },
                { model: Shelter, attributes: { exclude: ['password'] } }
            ]
        });
        return res.status(200).json(animals);
    } catch (error) {
        console.log("Error fetching animals:", error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Animal by ID
exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id, {
            include: [
                { model: Species },
                { model: Breed },
                { model: Shelter, attributes: { exclude: ['password'] } }
            ]
        });
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        return res.status(200).json(animal);
    } catch (error) {
        console.log('Error fetching animal:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Create new animal
exports.createAnimal = async (req, res) => {
    try {
      const animalData = req.body;
      
      // Get breed name for image lookup
      const breed = await Breed.findByPk(animalData.breedID);
      if (breed) {
        // Fetch an image based on species and breed
        const imageUrl = await getAnimalImage(animalData.speciesID, breed.breedName);
        
        // Only set the image if one isn't already provided
        if (imageUrl && !animalData.imageUrl) {
          animalData.imageUrl = imageUrl;
        }
      }
      
      const newAnimal = await Animal.create(animalData);
      return res.status(201).json(newAnimal);
    } catch (error) {
      console.error('Error creating animal:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

//Update animal
exports.updateAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        await animal.update(req.body);
        return res.status(200).json(animal);
    } catch (error) {
        console.error('Error updating animal:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete animal
exports.deleteAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        await animal.destroy();
        return res.status(200).json({ message: 'Animal deleted successfully' });
    } catch (error) {
        console.error('Error deleting animal:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get animals by shelter ID
exports.getAnimalsByShelter = async (req, res) => {
    try {
        const animals = await Animal.findAll({
            where: { shelterID: req.params.shelterID },
            include: [
                { model: Species },
                { model: Breed }
            ]
        });
        return res.status(200).json(animals);
    } catch (error) {
        console.error('Error fetching animals by shelter:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get animals by species
exports.getAnimalsBySpecies = async (req, res) => {
    try {
        const animals = await Animal.findAll({
            where: { speciesID: req.params.speciesID },
            include: [
                { model: Breed },
                { model: Shelter, attributes: { exclude: ['password'] } }
            ]
        });
        return res.status(200).json(animals);
    } catch (error) {
        console.error('Error fetching animals by species:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Filter animals
exports.filterAnimals = async (req, res) => {
    try {
        const { 
            speciesID, 
            breedID, 
            gender, 
            size, 
            ageMin, 
            ageMax, 
            isVaccinated,
            shelterID,
            status
        } = req.query;

        // Build the where clause dynamically
        const whereClause = {};
        
        // Add filters to the where clause if they exist
        if (speciesID) whereClause.speciesID = speciesID;
        if (breedID) whereClause.breedID = breedID;
        if (gender) whereClause.gender = gender;
        if (size) whereClause.size = size;
        if (isVaccinated !== undefined && isVaccinated !== '') 
            whereClause.isVaccinated = isVaccinated === 'true';
        if (shelterID) whereClause.shelterID = shelterID;
        if (status) whereClause.status = status;
        
        // Handle age range (convert to date)
        if (ageMin || ageMax) {
            const currentDate = new Date();
            
            if (ageMin && ageMax) {
                // Both min and max age specified
                const minDate = new Date(currentDate);
                minDate.setFullYear(currentDate.getFullYear() - ageMax);
                
                const maxDate = new Date(currentDate);
                maxDate.setFullYear(currentDate.getFullYear() - ageMin);
                
                whereClause.birthDate = {
                    [Op.between]: [minDate, maxDate]
                };
            } else if (ageMin) {
                // Only minimum age specified
                const date = new Date(currentDate);
                date.setFullYear(currentDate.getFullYear() - ageMin);
                
                whereClause.birthDate = {
                    [Op.lte]: date
                };
            } else if (ageMax) {
                // Only maximum age specified
                const date = new Date(currentDate);
                date.setFullYear(currentDate.getFullYear() - ageMax);
                
                whereClause.birthDate = {
                    [Op.gte]: date
                };
            }
        }

        // Execute the query
        const animals = await Animal.findAll({
            where: whereClause,
            include: [
                { model: Species },
                { model: Breed },
                { model: Shelter, attributes: { exclude: ['password'] } }
            ]
        });

        return res.status(200).json(animals);
    } catch (error) {
        console.error('Error filtering animals:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};