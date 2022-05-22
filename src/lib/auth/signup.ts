import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import checkIdentity from "../../lib/helper/identityCheck"
import passwordRequirement from "../../lib/helper/passwordRequirement"

import { cryptPassword } from "../../lib/helper/crypt"

export default async function signUp(userData) {
    try {
        const client = new PrismaClient();

        const isUserExists = (await client.user.count({ where: { email: userData.email } })) > 0

        if (isUserExists) {
            return { success: false, user: null }
        }

        const isPasswordEligble = passwordRequirement(userData.password);

        if (!isPasswordEligble.success) {
            return { success: false, user: null }
        }

        userData.password = await cryptPassword(userData.password)

        const userInsertResult = await client.user.create({ data: userData, select: { password: false, name: true } })
        return { success: true, user: userInsertResult }
    } catch (error) {
        return {success: false, user: null, error: error}
    }
}