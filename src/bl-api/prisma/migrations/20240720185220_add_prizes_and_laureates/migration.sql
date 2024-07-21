-- CreateTable
CREATE TABLE "Prize" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "year" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    CONSTRAINT "Prize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laureate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstname" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "share" TEXT NOT NULL,
    "prizeId" UUID NOT NULL,
    CONSTRAINT "Laureate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE
    "Laureate"
ADD
    CONSTRAINT "Laureate_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;