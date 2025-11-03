const { Router } = require("express");
const prisma = require("./prismaClient");
const router = Router();

router.get("/", (req, res) => {
  res.send("server up and running");
});

router.post("/check-data", async (req, res) => {
  console.log("connected to server");
  console.log(req.body);
  const body = req.body;
  console.log(body.x);
  console.log(body.y);
  const ron = await prisma.charcoords.findUnique({
    where: {
      name: "Ron",
    },
  });
  console.log(ron);
  if (
    ron.minX <= body.x &&
    body.x <= ron.maxX &&
    ron.minY <= body.y &&
    body.y <= ron.maxY
  ) {
    return res.status(200).json(ron);
  }
  return res.status(201).json({ message: "coordinates invalid" });
});

module.exports = router;
