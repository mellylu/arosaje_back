-- DropForeignKey
ALTER TABLE "Conseil" DROP CONSTRAINT "Conseil_Id_Conseil_fkey";

-- AlterTable
ALTER TABLE "Conseil" ADD COLUMN     "ConseilId" INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE "Conseil" ADD CONSTRAINT "Conseil_ConseilId_fkey" FOREIGN KEY ("ConseilId") REFERENCES "Annonce"("Id_Annonce") ON DELETE RESTRICT ON UPDATE CASCADE;
