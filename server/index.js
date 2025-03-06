const express = require("express");
const dotenv = require("dotenv").config();
const connection = require("./server");
const routesGeneral = require("./routes/routesGeneral");
const cors = require("cors");

// Necessary when using a request from the same from the same origin
const corsOptions = {
  origin: "http://localhost:5173", // Specify your frontend's origin
  credentials: true, // Allow credentials
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(routesGeneral);

// Configure CORS

// Use the vaccine routes
const port = 8000;

app.listen(port, () => {
  console.log(`Hey yo wassup !! the server is running on ${port}`);
});
