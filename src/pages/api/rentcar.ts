import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import json from "../../lib/resultType"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const client = new PrismaClient();
        const [userCar, sales] = await client.$transaction([
            client.userCar.update({ where: { id: req.body.userCarId }, data: { isOccupied: true } }),
            client.sales.create({ data: { ...req.body } })
        ])
        return await json.success(res, () => ({ userCar, sales }))
    } catch (error) {
        return await json.error(res, error.message, "Kiralama işleminde hata oluştu")
    }
}