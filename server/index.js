require ("dotenv").config();
const express = require("express");
require("./config/db");

const app = express();
app.use(express.json());

app.listen(17999, () =>{
  console.log(`App is running`);
})
