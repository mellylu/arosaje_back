/*
  Warnings:

  - Made the column `Civilite` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Annonce" DROP CONSTRAINT "Annonce_Id_Annonce_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Civilite" SET NOT NULL;
