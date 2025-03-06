const db = require("../../server");

exports.addVaccine = (req, res) => {
  const { name } = req.body;

  const query = "INSERT INTO vaccines (name) VALUES (?)";
  db.query(query, [name], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res
      .status(201)
      .json({ message: "Vaccine added successfully!", id: results.insertId });
  });
};
