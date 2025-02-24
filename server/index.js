const express = require("express");
const dotenv = require("dotenv").config();
const connection = require("./server");
const routesGeneral = require("./routes/routesGeneral");

const app = express();
app.use(express.json());
app.use(routesGeneral);

// Use the vaccine routes
const port = 8000;

app.listen(port, () => {
  console.log(`Hey yo wassup !! the server is running on ${port}`);
});
