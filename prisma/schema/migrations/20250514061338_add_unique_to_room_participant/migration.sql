/*
  Warnings:

  - The primary key for the `participant_rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `participant_rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId,userId]` on the table `participant_rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "participant_rooms" DROP CONSTRAINT "participant_rooms_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "participant_rooms_roomId_userId_key" ON "participant_rooms"("roomId", "userId");
