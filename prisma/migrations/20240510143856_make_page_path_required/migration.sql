/*
  Warnings:

  - Made the column `pagePath` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pagePath" SET NOT NULL;
