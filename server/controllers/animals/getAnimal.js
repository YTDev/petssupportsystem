const db = require("../../server");

exports.getAnimal = (req, res) => {
    const query = "SELECT * FROM animal";
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        // Return a success response with status 200 and the results
        res.status(200).json({
            message: "Animals shown successfully!",
            data: results, // Return the retrieved animal records
        });
    });
}