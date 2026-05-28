/*
  Warnings:

  - You are about to drop the `WorkType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WorkType";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL
);
