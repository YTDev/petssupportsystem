const db = require("../../server");

exports.filterAnimals = (req, res) => {
    const {speciesID, breedID, shelterID, gender, size, birthDate, status, isVaccinated} = req.query;

    let query = "SELECT * FROM animal WHERE 1=1";
    const params = [];

    if (speciesID) {
        query += " AND speciesID = ?";
        params.push(speciesID);
    }

    if(breedID) {
        query += " AND breedID = ?";
        params.push(breedID);
    }

    if(shelterID) {
        query += " AND shelterID = ?";
        params.push(shelterID);
    }

    if(gender) {
        query += " AND gender = ?";
        params.push(gender);
    }

    if(size) {
        query += " AND size = ?";
        params.push(size);
    }

    if(birthDate) {
        query += " AND birthDate = ?";
        params.push(birthDate);
    }

    if(status) {
        query += " AND status = ?";
        params.push(status);
    }

    if(isVaccinated) {
        query += " AND isVaccinated = ?";
        params.push(isVaccinated);
    }

    //Age filters
    if(ageMin) {
        query += " AND birthDate <= DATE_SUB(CURDATE(), INTERVAL ? YEAR)";
        params.push(ageMin);
    }

    if(ageMax) {
        query += " AND birthDate >= DATE_SUB(CURDATE(), INTERVAL ? YEAR)";
        params.push(ageMax);
    }

     //execute
     db.query(query, params, (error, results) => {
        if (error) {
            return res.status(500).json({error: error.message});
        }
        res.status(200).json(results);
     }
    );
}