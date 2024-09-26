/*
  Warnings:

  - Made the column `bytes` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "File" ALTER COLUMN "bytes" SET NOT NULL;
