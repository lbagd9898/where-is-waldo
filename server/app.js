const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("fuck you");
});

console.log(process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log("werking");
});
