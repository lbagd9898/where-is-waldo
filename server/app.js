const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./router");

require("dotenv").config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/", router);

app.listen(PORT, () => {
  console.log("werking");
});
