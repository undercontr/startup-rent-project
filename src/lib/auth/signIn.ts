import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import json from "../../lib/resultType";
import tryCatch from "../helper/decorators/tryCatchNext"
import { comparePassword } from "../../lib/helper/crypt";

export default async function signIn(email: string, password: string) {
    try {
        if (!(email && password)) {
            return { success: false, user: null }
        }

        const client = new PrismaClient();

        const user = await client.user.findUnique({ where: { email: email }, include: { userCars: true, bought: true, sold: true } })

        if (!user.password) {
            return { success: false, user: null }
        }

        if (user) {

            if (await comparePassword(password, user.password)) {
                return { success: true, user: user }
            } else {
                return { success: false, user: null }
            }
        } else {
            return { success: false, user: null }
        }

    } catch (error) {
        return {success: false, user: null}
    }
}