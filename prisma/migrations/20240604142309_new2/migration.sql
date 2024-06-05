/*
  Warnings:

  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "healthStatus" AS ENUM ('vaccinated', 'spayed', 'neutered');

-- CreateEnum
CREATE TYPE "petSize" AS ENUM ('small', 'medium', 'large');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "healthStatus" "healthStatus",
DROP COLUMN "size",
ADD COLUMN     "size" "petSize" NOT NULL;
