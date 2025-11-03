const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("server up and running");
});

app.post("/check-data", (req, res) => {
  console.log("connected to server");
  console.log(req.body);
  const body = req.body;
  res.status(200).json({ body });
});

app.listen(PORT, () => {
  console.log("werking");
});
