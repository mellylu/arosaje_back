/*
  Warnings:

  - Added the required column `Latitude` to the `Annonce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Longitude` to the `Annonce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Ville` to the `Annonce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annonce" ADD COLUMN     "Latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Ville" TEXT NOT NULL;
