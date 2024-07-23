/*
  Warnings:

  - Added the required column `availabilityPrice` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'MEMBER');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "availabilityPrice" DOUBLE PRECISION NOT NULL;
