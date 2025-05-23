-- CreateTable
CREATE TABLE `slider_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NULL,
    `thumbnail_url` VARCHAR(255) NULL,
    `index` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `summary_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `summary_content` VARCHAR(255) NOT NULL,
    `detail_content` VARCHAR(3000) NOT NULL,
    `thumbnail_url` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `about_us_introductions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumbnail_url` VARCHAR(1000) NULL,
    `thumbnail_type` ENUM('Photo', 'YoutubeVideo') NOT NULL DEFAULT 'Photo',
    `main_quote_content` VARCHAR(1000) NOT NULL,
    `about_us_content` VARCHAR(1500) NOT NULL,
    `why_choose_us` VARCHAR(1500) NOT NULL,
    `our_difference_content` VARCHAR(1500) NOT NULL,
    `our_culture_content` VARCHAR(1500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member` VARCHAR(50) NOT NULL,
    `role_name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(400) NOT NULL,
    `thumbnail_url` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certificates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `thumbnail_url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `catalog_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `type` ENUM('Service', 'Course', 'Product') NOT NULL,
    `summary` VARCHAR(255) NOT NULL,
    `detail` LONGTEXT NOT NULL,
    `thumbnail_url` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('PhoneNumber', 'ZaloNumber', 'Email', 'Address') NOT NULL,
    `content` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enquiries` (
    `int` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `content` VARCHAR(1000) NOT NULL,
    `received_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_completed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`int`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `general_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `application_name` VARCHAR(100) NOT NULL,
    `application_short_name` VARCHAR(15) NOT NULL,
    `is_under_maintainance` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NOT NULL,
    `unique_title` VARCHAR(255) NOT NULL,
    `thumbnail_url` VARCHAR(255) NULL,
    `content` LONGTEXT NOT NULL,
    `created_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_datetime` DATETIME(3) NULL,
    `is_pinned` BOOLEAN NOT NULL DEFAULT false,
    `is_published` BOOLEAN NOT NULL DEFAULT false,
    `views` INTEGER NOT NULL DEFAULT 0,
    `author_id` INTEGER NOT NULL,

    UNIQUE INDEX `posts_unique_title_key`(`unique_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `traffic_by_hours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recorded_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `access_count` INTEGER NOT NULL DEFAULT 0,
    `guest_count` INTEGER NOT NULL DEFAULT 0,
    `traffic_by_date_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `traffic_by_dates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recorded_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `access_count` INTEGER NOT NULL DEFAULT 0,
    `guest_count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `can_create_user` BOOLEAN NOT NULL DEFAULT false,
    `can_reset_user_password` BOOLEAN NOT NULL DEFAULT false,
    `can_delete_user` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `user_permissions_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `traffic_by_hours` ADD CONSTRAINT `traffic_by_hours_traffic_by_date_id_fkey` FOREIGN KEY (`traffic_by_date_id`) REFERENCES `traffic_by_dates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
