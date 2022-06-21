import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { processRentRequest } from "../../lib/db/repo";
import json from "../../lib/resultType"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const salesId = req.body.salesId;
        const isApproved = req.body.isApproved;
        const processResult = await processRentRequest({salesId, isApproved })
        return json.success(res, () => processResult.data, processResult.message)

    } catch (error) {
        return json.error(res, error.message, "Kiralama isteği işlenirken bir hata meydana geldi.")
    }
}