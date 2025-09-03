const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();
const DB_PASS = process.env.DB_PASSWORD;
// Create a connection to the database
const connection = mysql.createConnection({
  //-------------------------------Avien Connection----------------------------------//

  host: "mysql-3f888ca6-pet-support-system.j.aivencloud.com", 
  port: 17999,
  user: "avnadmin", 
  password: DB_PASS,
  database: "pet-support-system", 
  ssl: {
    ca: fs.readFileSync("./cert/ca.pem"), // Ensure SSL is used, adjust as necessary
  }

  //-------------------------------Local Connection----------------------------------//

  /*
  host: "localhost",
  user: "root",
  password: "",
  database: "bd_onlypaws",
  */
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }

  console.log("Connection successful!");
});

module.exports = connection;

/*

// Close the connection when done
connection.end((err) => {
  if (err) {
    console.error("Error closing the connection:", err.stack);
    return;
  }
  console.log("Connection closed.");
});
 */
