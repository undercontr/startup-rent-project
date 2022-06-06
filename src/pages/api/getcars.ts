import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import tryCatch from "../../lib/helper/decorators/tryCatchNext";
import json from "../../lib/resultType"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = new PrismaClient()
    return json.success(res, () => client.car.findMany(req.body))
}

export default tryCatch(handler)