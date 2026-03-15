const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const path = require("path");

require("dotenv").config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/", router);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("werking");
});

module.exports = app;
