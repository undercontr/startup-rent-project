import { PrismaClient } from "@prisma/client";

export async function getUserByEmail(email) {
    try {
        const client = new PrismaClient();
        return await client.user.findUnique({ where: { email: email } })
    } catch (error) {
        return null;
    }
}

// export async function get(entity) {
//     const client = new PrismaClient();
//     return {
//         async by(column) {
//             return {
//                 first: async (data) => {
//                     return await client[entity].findFirst({ where: {[column]: data} })
//                 },
//                 many: async (data) => {
//                     return await client[entity].findMany({ where: {[column]: data} })
//                 },
//                 unique: async (data) => {
//                     return await client[entity].findUnique({ where: {[column]: data} })
//                 }
//             }
//         }
//     }
// }