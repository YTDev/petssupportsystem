const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const petRoutes = require("./routes/petRoutes");
app.use("/api/pets", petRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Hey yo wassup !! the server is running on ${port}`);
});
