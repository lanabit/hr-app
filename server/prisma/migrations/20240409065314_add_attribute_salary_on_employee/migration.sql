/*
  Warnings:

  - Added the required column `salary` to the `employs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employs` ADD COLUMN `salary` INTEGER NOT NULL;
