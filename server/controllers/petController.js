const pool = require("../config/db");

exports.getPets = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Pets");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
