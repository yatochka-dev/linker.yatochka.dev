/*
  Warnings:

  - A unique constraint covering the columns `[pagePath]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pagePath" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_pagePath_key" ON "User"("pagePath");

-- CreateIndex
CREATE INDEX "User_pagePath_email_idx" ON "User"("pagePath", "email");
