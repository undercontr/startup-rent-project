/*
  Warnings:

  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserCar" (
    "userId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "totalDistance" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "images" TEXT NOT NULL,
    "dailyHireRate" DECIMAL NOT NULL,
    "locationX" REAL NOT NULL,
    "locationY" REAL NOT NULL,

    PRIMARY KEY ("userId", "carId"),
    CONSTRAINT "UserCar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserCar_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserCar" ("carId", "dailyHireRate", "images", "locationX", "locationY", "totalDistance", "userId", "year") SELECT "carId", "dailyHireRate", "images", "locationX", "locationY", "totalDistance", "userId", "year" FROM "UserCar";
DROP TABLE "UserCar";
ALTER TABLE "new_UserCar" RENAME TO "UserCar";
CREATE UNIQUE INDEX "UserCar_userId_key" ON "UserCar"("userId");
CREATE TABLE "new_Sales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userSellerId" INTEGER NOT NULL,
    "userBuyerId" INTEGER NOT NULL,
    "startingDistance" INTEGER NOT NULL,
    "distanceMade" INTEGER NOT NULL,
    CONSTRAINT "Sales_userBuyerId_fkey" FOREIGN KEY ("userBuyerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sales_userSellerId_fkey" FOREIGN KEY ("userSellerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sales" ("distanceMade", "id", "startingDistance", "userBuyerId", "userSellerId") SELECT "distanceMade", "id", "startingDistance", "userBuyerId", "userSellerId" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
CREATE UNIQUE INDEX "Sales_userSellerId_key" ON "Sales"("userSellerId");
CREATE UNIQUE INDEX "Sales_userBuyerId_key" ON "Sales"("userBuyerId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "password" TEXT,
    "image" TEXT
);
INSERT INTO "new_User" ("email", "emailVerified", "id", "image", "name", "password") SELECT "email", "emailVerified", "id", "image", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
