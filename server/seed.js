const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.charcoords.upsert({
    where: { name: "Ghoul" },
    update: {},
    create: { name: "Ghoul", minX: 16, maxX: 52, minY: 119, maxY: 233 },
  });
  await prisma.charcoords.upsert({
    where: { name: "Ogre" },
    update: {},
    create: { name: "Ogre", minX: 235, maxX: 351, minY: 174, maxY: 321 },
  });
  await prisma.charcoords.upsert({
    where: { name: "Ron" },
    update: {},
    create: { name: "Ron", minX: 462, maxX: 510, minY: 377, maxY: 441 },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
