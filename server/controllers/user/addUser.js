const db = require("../../server");
const { hashPassword } = require("../../middleware/passBcrypt");

exports.addUser = (req, res) => {
  const { name, email, address, phoneNumber, isAdmin, password, isActive } =
    req.body;
  //const encriptedPass = hashPassword(password);
  /* const encriptedPass = hashPassword(password);
  console.log(encriptedPass.then); */

  let encriptedPass;
  hashPassword(password)
    .then((hashedPassword) => {
      encriptedPass = hashedPassword;

      //The query had to be inserted after the promisse is resolved, otherwise it would try to store a promisse instead
      const query =
        "INSERT INTO user (name, email, address, phoneNumber, isAdmin, password, isActive) VALUES (?,?,?,?,?,?,?)";
      db.query(
        query,
        [name, email, address, phoneNumber, isAdmin, encriptedPass, isActive],
        (error, results) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          res.status(201).json({
            message: "User added successfully!",
            id: results.insertId,
          });
        }
      );
    })
    .catch((error) => {
      console.error("Error hashing password:", error);
    });
};
