-- CreateTable
CREATE TABLE "Conseil" (
    "Id_Conseil" SERIAL NOT NULL,
    "DateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Username" TEXT NOT NULL DEFAULT 'Anonyme',
    "Message" TEXT NOT NULL,

    CONSTRAINT "Conseil_pkey" PRIMARY KEY ("Id_Conseil")
);

-- AddForeignKey
ALTER TABLE "Conseil" ADD CONSTRAINT "Conseil_Id_Conseil_fkey" FOREIGN KEY ("Id_Conseil") REFERENCES "Annonce"("Id_Annonce") ON DELETE RESTRICT ON UPDATE CASCADE;
