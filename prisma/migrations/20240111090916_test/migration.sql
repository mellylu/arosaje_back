/*
  Warnings:

  - Added the required column `Test` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "Test" TEXT NOT NULL;
