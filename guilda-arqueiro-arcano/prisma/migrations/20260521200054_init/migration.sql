-- CreateTable
CREATE TABLE "Adventurer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characterClass" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "gold" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adventurer_pkey" PRIMARY KEY ("id")
);
