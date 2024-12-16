/*
  Warnings:

  - You are about to drop the `YourModelName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `YourModelName`;

-- CreateTable
CREATE TABLE `Todo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
