const bcrypt = require("bcrypt"); // or require('bcryptjs') if you installed bcryptjs
const db = require("../server"); // assuming you have a database connection setup

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch the user from the database
    const user = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].hashed_password
    ); // Ensure you use the correct field name for hashed password

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Successful login (you can send a token or user info as needed)
    res
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user[0].id, username: user[0].username },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
