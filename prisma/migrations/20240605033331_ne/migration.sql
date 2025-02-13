/*
  Warnings:

  - The primary key for the `petAdopteds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `petAdopteds` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "petAdopteds_petId_key";

-- AlterTable
ALTER TABLE "petAdopteds" DROP CONSTRAINT "petAdopteds_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "petAdopteds_pkey" PRIMARY KEY ("id");
