-- AlterTable
ALTER TABLE "Annonce" ADD COLUMN     "AnnonceGPP" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "UserGardGP" INTEGER,
ADD COLUMN     "UserPrioGP" INTEGER;

-- CreateTable
CREATE TABLE "GardePlantes" (
    "Id_GardePlante" SERIAL NOT NULL,

    CONSTRAINT "GardePlantes_pkey" PRIMARY KEY ("Id_GardePlante")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_UserPrioGP_fkey" FOREIGN KEY ("UserPrioGP") REFERENCES "GardePlantes"("Id_GardePlante") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_UserGardGP_fkey" FOREIGN KEY ("UserGardGP") REFERENCES "GardePlantes"("Id_GardePlante") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_AnnonceGPP_fkey" FOREIGN KEY ("AnnonceGPP") REFERENCES "GardePlantes"("Id_GardePlante") ON DELETE SET NULL ON UPDATE CASCADE;
