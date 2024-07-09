-- CreateTable
CREATE TABLE "Conversation" (
    "Id_Conversation" INTEGER NOT NULL,
    "user1Id" INTEGER NOT NULL,
    "user2Id" INTEGER NOT NULL,
    "UserId" INTEGER,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("Id_Conversation")
);

-- CreateTable
CREATE TABLE "Message" (
    "Id_Message" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("Id_Message")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id_Utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("Id_Conversation") ON DELETE RESTRICT ON UPDATE CASCADE;
