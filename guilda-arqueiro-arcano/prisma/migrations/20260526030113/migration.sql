-- AlterEnum
ALTER TYPE "QuestStatus" ADD VALUE 'ACCEPTED';

-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_adventurerId_fkey";

-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "adventurerId" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_adventurerId_fkey" FOREIGN KEY ("adventurerId") REFERENCES "Adventurer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
