import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {tryCatchNext} from "../../lib/helper/decorators/tryCatch";
import json from "../../lib/resultType"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = new PrismaClient()
    return json.success(res, () => client.car.findMany(req.body))
}

export default tryCatchNext(handler)