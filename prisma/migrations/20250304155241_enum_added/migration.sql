/*
  Warnings:

  - Added the required column `dept` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Dept" AS ENUM ('Bangla', 'Economics', 'Management', 'Sociology', 'Music');

-- CreateEnum
CREATE TYPE "Session" AS ENUM ('Y2017_18', 'Y2018_19', 'Y2019_20', 'Y2020_21', 'Y2021_22', 'Y2022_23', 'Y2024_25');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "dept" "Dept" NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "session" "Session" NOT NULL;
