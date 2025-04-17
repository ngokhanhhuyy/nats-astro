/*
  Warnings:

  - Added the required column `userId` to the `user_permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_permissions` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
