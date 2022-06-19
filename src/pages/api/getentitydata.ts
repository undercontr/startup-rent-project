import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import json from "../../lib/resultType"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const entity = req.body.entity;
        const query = req.body.query;

        const client = new PrismaClient()
        return json.success(res, () => client[entity].findMany(query))
    } catch (error) {
        return json.error(res, error.message)
    }
}