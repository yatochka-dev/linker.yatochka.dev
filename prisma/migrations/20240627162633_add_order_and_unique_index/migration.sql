/*
  Warnings:

  - A unique constraint covering the columns `[_userId,order]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link__userId_order_key" ON "Link"("_userId", "order");
