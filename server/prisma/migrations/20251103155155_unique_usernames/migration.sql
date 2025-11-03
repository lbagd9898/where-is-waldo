/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Charcoords` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Charcoords_name_key" ON "Charcoords"("name");
