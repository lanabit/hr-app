/*
  Warnings:

  - You are about to drop the column `salary` on the `employs` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `employs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `employs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employs` DROP COLUMN `salary`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `roles`;
