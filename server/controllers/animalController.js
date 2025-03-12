const { Animal, Species, Breed, Shelter } = require('../models/indexModels');

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
        const newAnimal = await Animal.create(req.body);
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