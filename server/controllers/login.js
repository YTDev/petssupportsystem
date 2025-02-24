//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../server"); // Adjust the path as per your project structure
const config = require("../utils/config"); // Your config file for JWT secret
const { verifyPassword } = require("../middleware/passBcrypt");

// Login function

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Fetch user from the database
  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      console.log("User Retrieved from DB:", results);
      const user = results[0];
      console.log("User Retrieved from DB:", user);
      // Compare the password with the hashed password in the database
      const match = await verifyPassword(password, user.password);
      console.log(password);
      console.log(user.password);
      console.log(match);
      if (!match) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Create and sign a JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        config.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Respond with the token
      return res.status(200).json({ token, email: user.email });
    }
  );
};

const logoutUser = (req, res) => {
  // Clear token on client-side
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  /* registerUser,
  editUser,
  deleteUser, */
  loginUser,
  logoutUser,
};

/*
Old one
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../server"); // Adjust the path as per your project structure
const config = require("../utils/config"); // Your config file for JWT secret
const { verifyPassword } = require("../middleware/passBcrypt");

// Login function

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user from the database
    const [user] = await connection.promise(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    //Verify errors or missing info from the JSON format
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password in the database
    const match = await verifyPassword(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Create and sign a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //Respond with the token
    return res.status(200).json({ token, email: user.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = (req, res) => {
  // Clear token on client-side
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
   registerUser,
  editUser,
  deleteUser, 
  loginUser,
  logoutUser,
};
*/
