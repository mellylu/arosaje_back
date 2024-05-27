-- DropForeignKey
ALTER TABLE "Annonce" DROP CONSTRAINT "Annonce_AnnonceUserGard_fkey";

-- AlterTable
ALTER TABLE "Annonce" ALTER COLUMN "AnnonceUserGard" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_AnnonceUserGard_fkey" FOREIGN KEY ("AnnonceUserGard") REFERENCES "User"("Id_Utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;
