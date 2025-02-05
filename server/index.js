const express = require("express");
const dotenv = require("dotenv").config();
const connection = require("./server");
const vaccineRoutes = require("./routes/vaccineRoute");

const app = express();
app.use(express.json());
app.use(vaccineRoutes);

// Use the vaccine routes

const port = 8000;

app.listen(port, () => {
  console.log(`Hey yo wassup !! the server is running on ${port}`);
});
