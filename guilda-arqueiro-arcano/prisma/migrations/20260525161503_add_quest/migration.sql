-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reward" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "adventurerId" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_adventurerId_fkey" FOREIGN KEY ("adventurerId") REFERENCES "Adventurer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
