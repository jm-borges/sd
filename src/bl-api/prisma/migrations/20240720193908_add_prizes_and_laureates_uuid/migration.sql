/*
  Warnings:

  - The primary key for the `Laureate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Prize` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Laureate" DROP CONSTRAINT "Laureate_prizeId_fkey";

-- AlterTable
ALTER TABLE "Laureate" DROP CONSTRAINT "Laureate_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "prizeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Laureate_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Prize" DROP CONSTRAINT "Prize_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Prize_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Laureate" ADD CONSTRAINT "Laureate_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
