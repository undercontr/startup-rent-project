/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AppUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "identityNo" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userSellerId" INTEGER NOT NULL,
    "userBuyerId" INTEGER NOT NULL,
    "startingDistance" INTEGER NOT NULL,
    "distanceMade" INTEGER NOT NULL,
    CONSTRAINT "Sales_userSellerId_fkey" FOREIGN KEY ("userSellerId") REFERENCES "AppUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sales_userBuyerId_fkey" FOREIGN KEY ("userBuyerId") REFERENCES "AppUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sales" ("distanceMade", "id", "startingDistance", "userBuyerId", "userSellerId") SELECT "distanceMade", "id", "startingDistance", "userBuyerId", "userSellerId" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
CREATE UNIQUE INDEX "Sales_userSellerId_key" ON "Sales"("userSellerId");
CREATE UNIQUE INDEX "Sales_userBuyerId_key" ON "Sales"("userBuyerId");
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_users" ("email", "email_verified", "id", "image", "name", "userId") SELECT "email", "email_verified", "id", "image", "name", "userId" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");
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
    CONSTRAINT "UserCar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserCar_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserCar" ("carId", "dailyHireRate", "images", "locationX", "locationY", "totalDistance", "userId", "year") SELECT "carId", "dailyHireRate", "images", "locationX", "locationY", "totalDistance", "userId", "year" FROM "UserCar";
DROP TABLE "UserCar";
ALTER TABLE "new_UserCar" RENAME TO "UserCar";
CREATE UNIQUE INDEX "UserCar_userId_key" ON "UserCar"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
