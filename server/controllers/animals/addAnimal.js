const db = require("../../server");

exports.addAnimal = (req, res) => {
    const {animalName, speciesID, breedID, shelterID, gender, size, birthDate, status, animalDescription, isVaccinated} = req.body;

    const query = "INSERT INTO animal (animalName, speciesID, breedID, shelterID, gender, size, birthDate, status, animalDescription, isVaccinated) VALUES (?,?,?,?,?,?,?,?,?,?)";

    db.query(
        query,
        [animalName, speciesID, breedID, shelterID, gender, size, birthDate, status, animalDescription, isVaccinated],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({
                message: "Animal added successfully!",
                id: results.insertId,
            });
        }
    )
}