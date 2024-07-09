-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("Id_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;
