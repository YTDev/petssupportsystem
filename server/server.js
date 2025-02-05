const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost", // Host name
  user: "root", // Your MySQL username (default is 'root')
  password: "", // Your MySQL password (default is empty)
  database: "bd_onlypaws", // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connection successful!");
  //console.log("Connected to the database as id " + connection.threadId);
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
