/*
  Warnings:

  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `employs` DROP FOREIGN KEY `employs_position_fkey`;

-- DropTable
DROP TABLE `Position`;

-- CreateTable
CREATE TABLE `positions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employs` ADD CONSTRAINT `employs_position_fkey` FOREIGN KEY (`position`) REFERENCES `positions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
