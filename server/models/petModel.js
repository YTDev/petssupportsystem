const connection = require("../db");

const getAllPets = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Pets";
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getAllPets,
};
