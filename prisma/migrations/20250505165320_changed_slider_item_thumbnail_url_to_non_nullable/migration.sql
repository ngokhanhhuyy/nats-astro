/*
  Warnings:

  - Made the column `thumbnail_url` on table `slider_items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `slider_items` MODIFY `thumbnail_url` VARCHAR(255) NOT NULL;
