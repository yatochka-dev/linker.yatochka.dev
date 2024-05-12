/*
  Warnings:

  - You are about to drop the column `iconURL` on the `Link` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('youtube', 'twitter', 'instagram', 'facebook', 'linkedin', 'github', 'pinterest', 'snapchat', 'tiktok', 'twitch', 'CUSTOM');

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "iconURL",
ADD COLUMN     "type" "LinkType" NOT NULL DEFAULT 'CUSTOM';
