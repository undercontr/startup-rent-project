import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { rentCar } from "../../lib/db/repo";
import json from "../../lib/resultType"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const status = await rentCar(req.body)
        const result = {
            func: status ? "success" : "error",
            message: status ? "" : "Bir hata oluştu"
        }
        return await json[result.func](res, () => null, result.message)
    } catch (error) {
        return await json.error(res, error.message, "Kiralama işleminde hata oluştu")
    }
}