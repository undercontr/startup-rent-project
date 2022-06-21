import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import json from "../../lib/resultType"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {salesId} = req.body;
        const client = new PrismaClient();

        const toUpdateSales = await client.sales.findUnique({ where: { id: Number(salesId) }, include: { userCar: true } });
        const [sales, userCar] = await client.$transaction([
            client.sales.update({ where: { id: toUpdateSales.id }, data: { isFinished: true } }),
            client.userCar.update({ where: { id: toUpdateSales.userCar.id }, data: { isOccupied: false } })
        ])

        return json.success(res, () => [sales, userCar])

    } catch (error) {
        return json.error(res, error.message, "Araç teslim alım kaydında hata")
    }
}