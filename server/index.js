const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

const port = 8000;

app.listen(port, () => {
  console.log(`Hey yo wassup !! the server is running on ${port}`);
});
