/*
  Warnings:

  - You are about to drop the column `Id_Conversation` on the `Annonce` table. All the data in the column will be lost.
  - You are about to drop the column `Id_Message` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `Id_Plante` on the `GardePlantes` table. All the data in the column will be lost.
  - You are about to drop the column `Id_UtilisateurGardien` on the `GardePlantes` table. All the data in the column will be lost.
  - You are about to drop the column `Id_UtilisateurProprietaire` on the `GardePlantes` table. All the data in the column will be lost.
  - You are about to drop the column `Test` on the `Message` table. All the data in the column will be lost.
  - Added the required column `Annonces` to the `GardePlantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UtilisateurGardien` to the `GardePlantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UtilisateurProprietaire` to the `GardePlantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annonce" DROP COLUMN "Id_Conversation";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "Id_Message";

-- AlterTable
ALTER TABLE "GardePlantes" DROP COLUMN "Id_Plante",
DROP COLUMN "Id_UtilisateurGardien",
DROP COLUMN "Id_UtilisateurProprietaire",
ADD COLUMN     "Annonces" INTEGER NOT NULL,
ADD COLUMN     "UtilisateurGardien" INTEGER NOT NULL,
ADD COLUMN     "UtilisateurProprietaire" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "Test";

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_Id_Conversation_fkey" FOREIGN KEY ("Id_Conversation") REFERENCES "Annonce"("Id_Annonce") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_Id_Message_fkey" FOREIGN KEY ("Id_Message") REFERENCES "Conversation"("Id_Conversation") ON DELETE RESTRICT ON UPDATE CASCADE;
