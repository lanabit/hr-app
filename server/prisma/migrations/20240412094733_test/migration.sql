/*
  Warnings:

  - Added the required column `position` to the `employs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employs` ADD COLUMN `position` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employs` ADD CONSTRAINT `employs_position_fkey` FOREIGN KEY (`position`) REFERENCES `Position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
