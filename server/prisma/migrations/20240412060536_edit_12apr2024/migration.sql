-- AlterTable
ALTER TABLE `attendance` MODIFY `clockOut` TIME NULL,
    MODIFY `isOnLeave` BOOLEAN NULL DEFAULT false,
    MODIFY `deduction` INTEGER NULL;
