/*
  Warnings:

  - You are about to drop the `GardePlantes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GardePlantes" DROP CONSTRAINT "GardePlantes_AnnoncesId_fkey";

-- DropForeignKey
ALTER TABLE "GardePlantes" DROP CONSTRAINT "GardePlantes_UtilisateurGardienId_fkey";

-- DropForeignKey
ALTER TABLE "GardePlantes" DROP CONSTRAINT "GardePlantes_UtilisateurProprietaireId_fkey";

-- DropTable
DROP TABLE "GardePlantes";
