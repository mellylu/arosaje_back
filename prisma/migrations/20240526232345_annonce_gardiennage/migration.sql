/*
  Warnings:

  - Added the required column `AnnonceUserGard` to the `Annonce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annonce" ADD COLUMN     "AnnonceUserGard" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_AnnonceUserGard_fkey" FOREIGN KEY ("AnnonceUserGard") REFERENCES "User"("Id_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;
