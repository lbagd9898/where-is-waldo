const dotenv = require("dotenv");
dotenv.config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const coords = [
    { name: "Ghoul", minX: 16, maxX: 52, minY: 119, maxY: 233 },
    { name: "Ogre", minX: 235, maxX: 351, minY: 174, maxY: 321 },
    { name: "Ron", minX: 462, maxX: 510, minY: 377, maxY: 441 },
  ];

  await prisma.charcoords.createMany({
    data: coords,
  });

  console.log("entries added successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
