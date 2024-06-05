/*
  Warnings:

  - Changed the type of `gender` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `healthStatus` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "gender",
ADD COLUMN     "gender" "gender" NOT NULL,
ALTER COLUMN "healthStatus" SET NOT NULL;
