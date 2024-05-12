-- AlterTable
ALTER TABLE "User" ALTER COLUMN "linkPageDescription" DROP NOT NULL,
ALTER COLUMN "linkPageDescription" DROP DEFAULT,
ALTER COLUMN "linkPageTitle" DROP NOT NULL,
ALTER COLUMN "linkPageTitle" DROP DEFAULT;
