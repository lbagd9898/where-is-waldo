const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const router = require("./router");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

const PORT = process.env.PORT || 3000;

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("werking");
});

module.exports = app;
