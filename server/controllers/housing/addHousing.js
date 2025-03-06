const db = require("../../server");

exports.addHousing = (req, res) => {
  const { name } = req.body;

  const query = "INSERT INTO home_details (name) VALUES (?)";
  db.query(query, [name], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({
      message: "House type added successfully!",
      id: results.insertId,
    });
  });
};
