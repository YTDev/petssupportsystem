const {Breed} = require('../models')

//All breeds
exports.getAllBreeds = async (req, res) => {
    try {
        const breeds = await Breed.findAll({
            include: [
                { model: Species }
            ]
        });
        return res.status(200).json(breeds);
    } catch (error) {
        console.log("Error fetching breeds:", error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Breed by ID
exports.getBreedById = async (req, res) => {
    try {
        const breed = await Breed.findByPk(req.params.id, {
            include: [
                { model: Species },
                ]
        });
        if (!breed) {
            return res.status(404).json({ message: 'Breed not found' });
        }
        return res.status(200).json(breed);
    } catch (error) {
        console.log('Error fetching breed:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get breed by species
exports.getBreedBySpecies = async (req, res) => {
    try {
        const breeds = await Breed.findAll({
            where: { speciesID: req.params.speciesID },            
        });
        return res.status(200).json(breeds);
    } catch (error) {
        console.error('Error fetching breeds by species:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};