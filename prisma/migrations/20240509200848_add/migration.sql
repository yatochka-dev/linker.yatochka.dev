-- AlterTable
ALTER TABLE "User" ADD COLUMN     "settings" JSONB NOT NULL DEFAULT '{}';

-- CreateTable
CREATE TABLE "Link" (
    "_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "iconURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "_userId" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link__userId_fkey" FOREIGN KEY ("_userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
