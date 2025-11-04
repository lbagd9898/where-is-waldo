-- CreateTable
CREATE TABLE "Highscores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Highscores_pkey" PRIMARY KEY ("id")
);
