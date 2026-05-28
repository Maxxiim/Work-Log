-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "work" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "volume" REAL NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL
);
INSERT INTO "new_Work" ("date", "id", "name", "unit", "work") SELECT "date", "id", "name", "unit", "work" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
