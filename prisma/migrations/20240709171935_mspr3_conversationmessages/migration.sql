/*
  Warnings:

  - A unique constraint covering the columns `[annonceId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `DateDebut` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DateFin` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `annonceId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annonce" ALTER COLUMN "DateDebut" SET NOT NULL,
ALTER COLUMN "DateFin" SET NOT NULL;

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "annonceId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_annonceId_key" ON "Conversation"("annonceId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "Annonce"("Id_Annonce") ON DELETE RESTRICT ON UPDATE CASCADE;
