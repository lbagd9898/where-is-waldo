const { Router } = require("express");
const prisma = require("./prismaClient");
const router = Router();

// router.get("/", (req, res) => {
//   res.send("server up and running");
// });

router.post("/check-data", async (req, res) => {
  try {
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
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "internal server error" });
  }
});

router.post("/enter-winner", async (req, res) => {
  try {
    console.log("connected to server");
    const { username, secondsElapsed } = req.body;

    if (
      typeof secondsElapsed !== "number" ||
      secondsElapsed <= 0 ||
      !Number.isInteger(secondsElapsed)
    ) {
      return res.status(400).json({ error: "Invalid score" });
    }

    if (typeof username !== "string" || username.trim().length === 0) {
      return res.status(400).json({ error: "Invalid username" });
    }
    await prisma.highscores.create({
      data: {
        name: username,
        score: secondsElapsed,
      },
    });
    return res.status(200).json({ message: "data enterred successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "failed to enter winner" });
  }
});

router.get("/get-highscore", async (req, res) => {
  try {
    console.log("server reached");
    const highscore = await prisma.highscores.findFirst({
      orderBy: {
        score: "asc",
      },
    });
    console.log(highscore);
    res.status(200).json(highscore);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
