import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import tryCatch from "../../lib/helper/decorators/tryCatchNext";
import json from "../../lib/resultType"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = new PrismaClient()
    const formData = req.body
    const user = await client.user.findUnique({where: {email: formData.user}})

    const addCarObj = {
        userId: user.id,
        carId: formData.carId,
        totalDistance: formData.totalDistance,
        locationX: formData.locationX,
        locationY: formData.locationY,
        year: formData.year,
        dailyHireRate: formData.dailyHireRate
    }

    return json.success(res, () => client.userCar.create({data: addCarObj}), "Araç başarıyla eklendi")
}

export default tryCatch(handler, "Araç eklenirken bir hata oluştu")