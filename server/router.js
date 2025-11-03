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
  console.log(body.charId);
  const char = await prisma.charcoords.findUnique({
    where: {
      id: body.charId,
    },
  });
  console.log(char);
  if (
    char.minX <= body.x &&
    body.x <= char.maxX &&
    char.minY <= body.y &&
    body.y <= char.maxY
  ) {
    return res.status(200).json({ char });
  }
  return res.status(201).json({ char: null });
});

module.exports = router;
