-- CreateTable
CREATE TABLE "User" (
    "Id_Utilisateur" SERIAL NOT NULL,
    "Civilite" TEXT,
    "Nom" TEXT,
    "Prenom" TEXT,
    "Email" TEXT NOT NULL,
    "Mdp" TEXT,
    "NumTel" TEXT,
    "Latitude" TEXT,
    "Longitude" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id_Utilisateur")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
