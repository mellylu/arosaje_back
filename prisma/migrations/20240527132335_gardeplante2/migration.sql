/*
  Warnings:

  - You are about to drop the column `AnnonceGPP` on the `Annonce` table. All the data in the column will be lost.
  - You are about to drop the column `UserGardGP` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserPrioGP` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UtilisateurProprietaireId]` on the table `GardePlantes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UtilisateurGardienId]` on the table `GardePlantes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[AnnoncesId]` on the table `GardePlantes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AnnoncesId` to the `GardePlantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UtilisateurGardienId` to the `GardePlantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UtilisateurProprietaireId` to the `GardePlantes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Annonce" DROP CONSTRAINT "Annonce_AnnonceGPP_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_UserGardGP_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_UserPrioGP_fkey";

-- AlterTable
ALTER TABLE "Annonce" DROP COLUMN "AnnonceGPP";

-- AlterTable
ALTER TABLE "GardePlantes" ADD COLUMN     "AnnoncesId" INTEGER NOT NULL,
ADD COLUMN     "UtilisateurGardienId" INTEGER NOT NULL,
ADD COLUMN     "UtilisateurProprietaireId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "UserGardGP",
DROP COLUMN "UserPrioGP";

-- CreateIndex
CREATE UNIQUE INDEX "GardePlantes_UtilisateurProprietaireId_key" ON "GardePlantes"("UtilisateurProprietaireId");

-- CreateIndex
CREATE UNIQUE INDEX "GardePlantes_UtilisateurGardienId_key" ON "GardePlantes"("UtilisateurGardienId");

-- CreateIndex
CREATE UNIQUE INDEX "GardePlantes_AnnoncesId_key" ON "GardePlantes"("AnnoncesId");

-- AddForeignKey
ALTER TABLE "GardePlantes" ADD CONSTRAINT "GardePlantes_UtilisateurProprietaireId_fkey" FOREIGN KEY ("UtilisateurProprietaireId") REFERENCES "User"("Id_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardePlantes" ADD CONSTRAINT "GardePlantes_UtilisateurGardienId_fkey" FOREIGN KEY ("UtilisateurGardienId") REFERENCES "User"("Id_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardePlantes" ADD CONSTRAINT "GardePlantes_AnnoncesId_fkey" FOREIGN KEY ("AnnoncesId") REFERENCES "Annonce"("Id_Annonce") ON DELETE RESTRICT ON UPDATE CASCADE;
