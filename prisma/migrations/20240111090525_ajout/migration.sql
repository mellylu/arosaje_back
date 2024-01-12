/*
  Warnings:

  - You are about to drop the column `Id_Plante` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `NumTel` on the `User` table. All the data in the column will be lost.
  - Added the required column `Pseudo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Ville` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `Nom` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Prenom` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Mdp` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Latitude` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Longitude` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Id_Plante",
DROP COLUMN "NumTel",
ADD COLUMN     "Pseudo" TEXT NOT NULL,
ADD COLUMN     "Ville" TEXT NOT NULL,
ALTER COLUMN "Nom" SET NOT NULL,
ALTER COLUMN "Prenom" SET NOT NULL,
ALTER COLUMN "Mdp" SET NOT NULL,
DROP COLUMN "Latitude",
ADD COLUMN     "Latitude" DOUBLE PRECISION NOT NULL,
DROP COLUMN "Longitude",
ADD COLUMN     "Longitude" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Annonce" (
    "Id_Annonce" INTEGER NOT NULL,
    "Id_Plante" TEXT NOT NULL,
    "Titre" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Etat" BOOLEAN NOT NULL DEFAULT false,
    "DateDebut" TIMESTAMP(3) NOT NULL,
    "DateFin" TIMESTAMP(3) NOT NULL,
    "Id_Conversation" TEXT NOT NULL,

    CONSTRAINT "Annonce_pkey" PRIMARY KEY ("Id_Annonce")
);

-- CreateTable
CREATE TABLE "GardePlantes" (
    "Id_GardePlante" INTEGER NOT NULL,
    "Id_UtilisateurProprietaire" INTEGER NOT NULL,
    "Id_UtilisateurGardien" INTEGER NOT NULL,
    "Id_Plante" INTEGER NOT NULL,
    "Photos" TEXT[],

    CONSTRAINT "GardePlantes_pkey" PRIMARY KEY ("Id_GardePlante")
);

-- CreateTable
CREATE TABLE "ConseilsBotanistes" (
    "Id_ConseilBotaniste" INTEGER NOT NULL,
    "Id_UtilisateurBotaniste" INTEGER NOT NULL,
    "Id_Plante" INTEGER NOT NULL,
    "ConseilEntretien" TEXT NOT NULL,
    "DateConseil" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConseilsBotanistes_pkey" PRIMARY KEY ("Id_ConseilBotaniste")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "Id_Conversation" INTEGER NOT NULL,
    "Id_UtilisateurProprietaire" INTEGER NOT NULL,
    "Id_UtilisateurGardien" INTEGER NOT NULL,
    "Id_Message" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("Id_Conversation")
);

-- CreateTable
CREATE TABLE "Message" (
    "Id_Message" INTEGER NOT NULL,
    "MessageProprietaire" TEXT NOT NULL,
    "MessageGardien" TEXT NOT NULL,
    "DatePropretaire" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DateGardien" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("Id_Message")
);

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_Id_Annonce_fkey" FOREIGN KEY ("Id_Annonce") REFERENCES "User"("Id_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;
