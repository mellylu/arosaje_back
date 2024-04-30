-- AlterTable
ALTER TABLE "Annonce" ADD COLUMN     "AnnonceUser" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_AnnonceUser_fkey" FOREIGN KEY ("AnnonceUser") REFERENCES "User"("Id_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;
