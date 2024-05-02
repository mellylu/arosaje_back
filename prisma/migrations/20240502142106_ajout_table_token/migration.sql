-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;
