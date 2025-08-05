-- AlterTable
ALTER TABLE "laptops" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
