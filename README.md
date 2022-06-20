# C2C Car Rental System
A web application that lets people rent their cars to each other without handling car rental companies. UI and database system built up for such purpose.

## Stack
Language: **TypeScript 4.7**\
Frontend Library: **Next.js v12.1.6 (React v18.1)**\
Database: **SQLite**\
ORM: **Prisma**\ (TypeORM for future SQL development)
Authentication System: **Next-Auth (an plugin for Next.js)**

## Stack Explanation
The next package used for SSR and SSG problems in order to access database and perform CRUD operations while writing the frontend with React JSX. With the next package we were able to write an API inside React app that should be served by Node.js and accessing high level elements of backend programming.

Prisma is an ORM that handles database operations in not a traditional ORM way. We wrote a schema and database was ready. Database operations are very simplifed and transactions are supported. We decided to use Prisma becasue MongoDb support. It lets you write a schema for MongoDb. We might migrate to TypeORM if we wanted to keep the SQL.

Since this will be a slightly larger application then normal blog app we decied to use TypeScript as for both backend and frontend programming because the types are mattered the most of the development process. There are several cases that relations made in Prisma ORM includes relations or not. So we had to write types to know which relation should be included. Next.js and Prisma both has very good integration with TypeScript (not to mention React).

*For a demo process we used SQlite database system but for future developments we will migrate to **MongoDb** for even better Javascript and Typescript integration.*

For authentication purposes we used Next-Auth package and use their providers to let user login to the system. Google is currently only supported provider to login. Traditional login system (email, password) is also supported.

## Car Rental
Users can simply add their cars and wait for the rent requests. It is simple as that. It is very easy to use. There is a Google maps with the car pins on it. User can select one of the car and choose date then send a rent request to the owner of the car. Owner of the car has to decide whether car should be rented or not. Owner can approve or deny the rent request and renter will be informed.
