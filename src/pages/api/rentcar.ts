import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import json from "../../lib/resultType"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = new PrismaClient();
        return await json.success(res, () => client.sales.create({data: req.body}))
    } catch (error) {
        return await json.error(res, error.message, "Kiralama işleminde hata oluştu")
    }
}