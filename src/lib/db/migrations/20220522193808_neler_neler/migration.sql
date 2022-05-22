/*
  Warnings:

  - You are about to drop the column `firstName` on the `AppUser` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `AppUser` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AppUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "birthDate" DATETIME NOT NULL
);
INSERT INTO "new_AppUser" ("birthDate", "id") SELECT "birthDate", "id" FROM "AppUser";
DROP TABLE "AppUser";
ALTER TABLE "new_AppUser" RENAME TO "AppUser";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
