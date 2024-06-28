-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "Link_order_seq";
