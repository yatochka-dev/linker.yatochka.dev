-- CreateEnum
CREATE TYPE "PageDesign" AS ENUM ('BLACKWHITE', 'WHITEBLACK');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "linkPageDesign" "PageDesign" NOT NULL DEFAULT 'BLACKWHITE';
