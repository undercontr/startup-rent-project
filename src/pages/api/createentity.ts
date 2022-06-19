import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import json from "../../lib/resultType"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const entity = req.body.entity;
        const query = req.body.query

        const client = new PrismaClient();

        const createdEntity  = await client[entity].create(query)

        return json.success(res, () => createdEntity)
    } catch (error) {
        return json.error(res, error.message, "Kayıt oluşturulurken hata oluştu.")
    }
}