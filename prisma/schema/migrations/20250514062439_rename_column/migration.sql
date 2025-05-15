/*
  Warnings:

  - You are about to drop the column `roomId` on the `participant_rooms` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `participant_rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,room_id]` on the table `participant_rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_id` to the `participant_rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `participant_rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "participant_rooms" DROP CONSTRAINT "participant_rooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "participant_rooms" DROP CONSTRAINT "participant_rooms_userId_fkey";

-- DropIndex
DROP INDEX "participant_rooms_roomId_userId_key";

-- AlterTable
ALTER TABLE "participant_rooms" DROP COLUMN "roomId",
DROP COLUMN "userId",
ADD COLUMN     "room_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "participant_rooms_user_id_room_id_key" ON "participant_rooms"("user_id", "room_id");

-- AddForeignKey
ALTER TABLE "participant_rooms" ADD CONSTRAINT "participant_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant_rooms" ADD CONSTRAINT "participant_rooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
