/*
  Warnings:

  - The `Id_Plante` column on the `Annonce` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ConseilsBotanistes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GardePlantes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_Id_Conversation_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_Id_Message_fkey";

-- AlterTable
ALTER TABLE "Annonce" ADD COLUMN     "DateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "Id_Plante",
ADD COLUMN     "Id_Plante" TEXT[];

-- DropTable
DROP TABLE "ConseilsBotanistes";

-- DropTable
DROP TABLE "Conversation";

-- DropTable
DROP TABLE "GardePlantes";

-- DropTable
DROP TABLE "Message";
