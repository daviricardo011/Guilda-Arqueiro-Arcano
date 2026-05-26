/*
  Warnings:

  - Changed the type of `status` on the `Quest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QuestStatus" AS ENUM ('PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "status",
ADD COLUMN     "status" "QuestStatus" NOT NULL;
