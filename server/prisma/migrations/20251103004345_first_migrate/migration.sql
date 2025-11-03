-- CreateTable
CREATE TABLE "Charcoords" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "minX" INTEGER NOT NULL,
    "maxX" INTEGER NOT NULL,
    "minY" INTEGER NOT NULL,
    "maxY" INTEGER NOT NULL,

    CONSTRAINT "Charcoords_pkey" PRIMARY KEY ("id")
);
