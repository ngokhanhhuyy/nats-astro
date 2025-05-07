/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `traffic_by_hours` DROP FOREIGN KEY `traffic_by_hours_traffic_by_date_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_permissions` DROP FOREIGN KEY `user_permissions_userId_fkey`;

-- DropIndex
DROP INDEX `posts_unique_title_key` ON `posts`;

-- CreateIndex
CREATE UNIQUE INDEX `unique_post_title` ON `posts`(`title`);

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `fk_posts_users_authorId` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `traffic_by_hours` ADD CONSTRAINT `fk_trafficByHours_trafficByDates_trafficByDateId` FOREIGN KEY (`traffic_by_date_id`) REFERENCES `traffic_by_dates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_permissions` ADD CONSTRAINT `fk_userPermissions_users_userId` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `users_username_key` TO `unique_user_userName`;
