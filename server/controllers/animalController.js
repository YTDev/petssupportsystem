const {Animal, Species, Breed, Shelter} = require('../models');

//All animals
exports.getAllAnimals = async(req, res) => {
    try {
        const animals = await Animal.findAll({
            include: [
                {model:Species},
                {model:Breed},
                {model:Shelter, attributes:{exclude:['password']}}
            ]
        });
        return res.status(200).json(animals);
    } catch (error) {
        console.log("Error fetching animals:", error);
        return res.status(500).json({message:'Server error', error: error.message});
    }
};
