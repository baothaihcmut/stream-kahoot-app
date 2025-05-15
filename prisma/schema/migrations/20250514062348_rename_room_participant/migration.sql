/*
  Warnings:

  - You are about to drop the column `join_at` on the `participant_rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "participant_rooms" DROP COLUMN "join_at",
ADD COLUMN     "joined_at" TIMESTAMP(3),
ALTER COLUMN "leave_at" DROP NOT NULL;
